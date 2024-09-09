import { Box, Button, Typography } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
const ethers = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum);

export default function ConnectWallet({
  connectedWalletAddress,
  setConnectedWalletAddress,
}) {
  const [provider, setProvider] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Optional: Detect account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setConnectedWalletAddress(accounts.length ? accounts[0] : null);
        console.log("Account changed:", accounts[0]);
      });

      window.ethereum.on("connect", (info) => {
        console.log("Connected to network:", info);
      });

      window.ethereum.on("disconnect", (error) => {
        console.log("Disconnected:", error);
        setConnectedWalletAddress(null);
      });
    }
  }, []);

  const connectWallet = async () => {
    if (connectedWalletAddress != null) {
      setConnectedWalletAddress(null);
      return;
    }

    console.log("Connecting to wallet...");
    if (typeof window.ethereum !== "undefined") {
      try {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(newProvider);
        console.log("Provider:", newProvider);
        // Request the user's wallet address (MetaMask will show the popup)
        await newProvider.send("eth_requestAccounts", []);

        console.log("Connected to wallet:", newProvider);
        const signer = newProvider.getSigner();
        const accountAddress = await signer.getAddress();
        console.log("Account address:", accountAddress);
        setConnectedWalletAddress(accountAddress);
        setErrorMessage("");
        return;
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        setErrorMessage("Failed to connect to MetaMask!");
      }
    } else {
      setErrorMessage(
        "MetaMask is not installed. Please install it to use this app."
      );
    }
    setConnectedWalletAddress(null);
  };

  async function connectWalletOld() {
    if (connected) {
      setConnectedWalletAddress(null);
      return;
    }

    if (!window.ethereum) {
      console.error("Please Install Metamask!!!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setConnectedWalletAddress(accounts.length ? accounts[0] : null);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      setErrorMessage("Failed to connect to MetaMask. Please try again.");
    }
  }

  function shrinkAddress(address) {
    if (!address) {
      return null;
    }
    return address.slice(0, 4) + "..." + address.slice(-4);
  }

  return (
    <Box>
      <Button
        className="connect-btn"
        onClick={connectWallet}
        color="primary"
        size="small"
        variant="outlined"
      >
        {connectedWalletAddress != null
          ? "Disconnect " + shrinkAddress(connectedWalletAddress)
          : "Connect Wallet"}
      </Button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Box>
  );
}
