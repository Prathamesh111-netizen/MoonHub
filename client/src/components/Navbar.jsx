//Navbar
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@arcana/auth-react";
import profileLoad from "../assets/loader.gif";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { AvatarGenerator } from "random-avatar-generator";

const Navbar = () => {
  const auth = useAuth();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  // const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  const [provider, setProvider] = useState(null);
  const setAccount = () => {
    const result = auth.user;
    console.log(result);
    if (result) {
      toast.success("Logged in");
      setIsLoggedin(true);
      localStorage.setItem("defaultAccount", JSON.stringify(result.address));
      localStorage.setItem("selectedAddress", JSON.stringify(result.address));
      setAvatar(result.picture);
    }
  };

  const loginWithArcana = async () => {
    await auth
      .loginWithSocial("github")
      .then((result) => {
        setAccount();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error logging in");
      });
  };

  // const logout = () => {
  //   auth.logout();
  //   localStorage.clear();
  //   setIsLoggedin(false);
  //   toast.success("Logged Out", {
  //     autoClose: 1000,
  //   });
  //   window.location.reload();
  // };

  useEffect(() => {
    if (auth.user) {
      const result = auth.user;
      console.log(result);
      if (result) {
        setIsLoggedin(true);
        localStorage.setItem("defaultAccount", JSON.stringify(result.address));
        setAvatar(result.picture);
      }
      setIsLoading(false);
    }
  }, [auth.user]);

  const connectWalletHandler = (isClicked) => {
    if (
      window.ethereum != null &&
      window.ethereum.isMetaMask === true &&
      window.ethereum.isConnected() === true
    ) {
      // set ethers provider
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      // connect to metamask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(result);
          // setConnButtonText("Wallet Connected");
          if (isClicked) {
            toast.success("Wallet Connected");
          }
          setIsLoggedin(true);
          setDefaultAccount(result[0]);
          const generator = new AvatarGenerator();
          localStorage.setItem("defaultAccount", JSON.stringify(result[0]));
          localStorage.setItem("userBalance", JSON.stringify(result[0]));
          setAvatar(generator.generateRandomAvatar());
          setIsLoading(false);
        })
        .catch((error) => {
          // setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask and enable it on this tab");
      toast.error(
        "Please install MetaMask browser extension and enable it on this tab to interact "
      );
      // setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  const logout = () => {
    toast("Logged Out");
    localStorage.removeItem("defaultAccount");
    localStorage.removeItem("userBalance");
    setDefaultAccount(null);
    setUserBalance(null);
    setIsLoggedin(false);
    setConnButtonText("Connect Wallet");
    // window.location.reload();
  };

  useEffect(() => {
    const defaultAccount = JSON.parse(localStorage.getItem("defaultAccount"));
    if (defaultAccount && window.ethereum.selectedAddress === defaultAccount) {
      connectWalletHandler();
      setDefaultAccount(defaultAccount);
      setIsLoggedin(true);

      const generator = new AvatarGenerator();
      setAvatar(generator.generateRandomAvatar("" + defaultAccount));
    } else {
      setIsLoggedin(false);
    }
  }, []);

  return (
    <div className="w-11/12 md:mr-10 md:ml-10 ml-5 md-5 rounded-xl navbar">
      <div className="flex-1 text-blue-200 text-3xl">
        <Link to="/">MoonHub</Link>
      </div>
      <div className="flex-none">
        {isLoading && <img src={profileLoad} className="h-10" />}
        {!isLoggedin && (
          <div className="dropdown dropdown-end flex gap-3">
            <button
              className="justify-between"
              onClick={() =>loginWithArcana()}
            >
              Connect Arcana
            </button>
          </div>
        )}
        {!isLoggedin && (
          <div className="dropdown dropdown-end flex gap-3">
            <button
              className="justify-between"
              onClick={() => connectWalletHandler(true)}
            >
              Connect Now
            </button>
          </div>
        )}

        {isLoggedin && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {avatar && <img src={avatar} />}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/hub">My Hub</Link>
              </li>
              <li>
                <Link to="/explore">Explore</Link>
              </li>
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
