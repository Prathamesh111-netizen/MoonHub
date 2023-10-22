import React, { useState, useEffect } from "react";
import RepoCard from "./RepoCard";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import axios from "axios";

export default function ReposList() {
  const [repos, setRepos] = React.useState([]);
  const main = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log(address);
    axios
      .get(`${import.meta.env.VITE_BACKEND_SERVER}/repository/my/${address}`)
      .then((res) => {
        console.log(res);
        setRepos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <div className="">
        {repos.map((repo) => {
          return <RepoCard repo={repo} />;
        })}
      </div>
    </>
  );
}
