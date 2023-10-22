import React, { useRef, useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import { useAuth } from "@arcana/auth-react";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from 'ethers';

export default function CreateRepo() {
  const [formData, updateFormData] = useState({});
  const [fileEvent, setFileEvent] = useState(null);
  const auth = useAuth();

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };


  /* Deploy file along with encryption */
  const deployEncrypted = async (e) => {
    const sig = await encryptionSignature();
    const response = await lighthouse.uploadEncrypted(
      e,
      sig.publicKey,
      import.meta.env.VITE_LIGHTHOUSE_KEY,
      sig.signedMessage,
      progressCallback
    );
    console.log(response);
    /*
      output:
        {
          Name: "c04b017b6b9d1c189e15e6559aeb3ca8.png",
          Size: "318557",
          Hash: "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"
        }
      Note: Hash in response is CID.
    */
      return response.data.Hash;
  };

  const progressCallback = (progressData) => {
    let percentageDone =
      100 - (progressData?.total / progressData?.uploaded)?.toFixed(2);
    console.log(percentageDone);
  };

  const deploy = async (e) => {
    // Push file to lighthouse node
    // Both file and folder supported by upload function
    const output = await lighthouse.upload(
      e,
      import.meta.env.VITE_LIGHTHOUSE_KEY,
      progressCallback
    );
    console.log("File Status:", output);
    console.log(
      "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
    );
    return output.data.Hash;
  };

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const folder = await deployEncrypted(fileEvent);
    // const { address } = auth.user;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const data = {
      folder: folder,
      owner: address,
      ...formData,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_SERVER}/repository`, data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        toast.success("Repository Created Successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Repository Creation Failed");
      });
  };

  return (
    <div>
      <>
        <form class="w-full max-w-screen" onSubmit={handleSubmit}>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Repository Name
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-first-name"
                name="name"
                type="text"
                placeholder="MoonHub"
                onChange={handleChange}
              />
              {/* <p class="text-red-500 text-xs italic">
                Please fill out this field.
              </p> */}
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                ImageLink
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
                name="image"
                placeholder="https://www.google.com/"
                onChange={handleChange}
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full  px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Description
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="lorem epsum"
                name="description"
                onChange={handleChange}
              />
            </div>

            <div class="w-full md:w-1/3 px-3 mb-8 mt-4 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-subscriptionRate"
              >
                Subscription Rate
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-subscriptionRate"
                name="subscriptionRate"
                type="text"
                placeholder="2Cr/m"
                onChange={handleChange}
              />
            </div>

            <div class="w-full md:w-1/3 px-3 mt-4 mb-8 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-oneTimeFee"
              >
                One Time Fee
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-oneTimeFee"
                name="oneTimeFee"
                type="text"
                placeholder="2ETH"
                onChange={handleChange}
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mt-4 mb-8 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-oneTimeFee"
              >
                Currency (e.g. ETH, USDT)
              </label>
              <input
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-oneTimeFee"
                name="currency"
                type="text"
                placeholder="ETH"
                onChange={handleChange}
              />
            </div>
          </div>
          <h2>Select a folder to send to the server</h2>
          <input
            // directory=""
            // webkitdirectory=""
            type="file"
            className="bg-gray-200 file-input file-input-info w-full max-w-screen"
            onChange={(e) => {
              setFileEvent(e);
            }}
          />
          <div className="flex justify-center pt-5">
            <button
              className="block bg-blue-600 hover:bg-blue-800 btn"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </>
    </div>
  );
}
