import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";
import {MOOD_CONTRACT_ADDRESS,abi} from "./constants/constants"
import './App.css';

function App() {

  const [walletaddress, setwalletaddress] = useState("");
  const [web3, setweb3] = useState("");
  const [moods, setmoods] = useState();
  const [currentmood, setcurrentmood] = useState();
  const [changemood, setchangemood] = useState();

  useEffect(() => {
    async function getaccount() {
      let _web3 = new Web3(
        "https://shy-still-mansion.ethereum-goerli.discover.quiknode.pro/33e2d869d9dfc881a6773a9beb5c0c96b0eff67a/"
      );
      console.log(web3);
      console.log(typeof web3.eth);
      setweb3(_web3);
      if (window.ethereum) {
        console.log("Metamask wallet detected");

        //Now as the metamask wallet is detected we now get the details of all the accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts[0]);
        setwalletaddress(accounts[0]);
      }
      const instance3 = await new _web3.eth.Contract(
        abi,
        MOOD_CONTRACT_ADDRESS
      );
      setmoods(instance3);
      console.log("The smart contract has been initalized");
    }

    getaccount();
  }, []);



  async function moodfnc() {
    // let mood = await moods.methods.getmood().call({
    //   from: walletaddress,
    // });

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(
      MOOD_CONTRACT_ADDRESS,
      abi,
      signer
    );

    let mood = await contract.getMood({
      from: walletaddress,
    });

    console.log("This is the mood of the last person");
    console.log(mood);
    setcurrentmood(mood);
  }


  async function changefnc() {
    

    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = await new ethers.Contract(
      MOOD_CONTRACT_ADDRESS,
      abi,
      signer
    );

    let data1 = await contract.setMood(changemood, {
      from: walletaddress,
    });

    console.log(data1);
    console.log("This is the data1", data1.toString());
  }


  return (
    <div className="flex-container">
    <div className="card">
    <h1>This is the wallet address of the user</h1>
    <p>{walletaddress}</p>
    <button
        onClick={(e) => {
          moodfnc();
        }}
        className="button1"
      >
        Get the mood
      </button>

      <div className="description"><h2>Set the Mood</h2></div>
      <input
        type="text"
        value={changemood}
        onChange={(e) => {
          setchangemood(e.target.value);
        }}
      ></input>
      <button
        onClick={(e) => {
          changefnc();
        }}
        className="button2"
      >
        Change the current mood
      </button>
      <div className="description"><h2>Current mood is:{currentmood}</h2></div>
    </div></div>
  );
}

export default App;
