import * as React from 'react';
import { useState, useEffect } from 'react';
const ethers = require("ethers");

const provider = new ethers.providers.Web3Provider(window.ethereum)

export default function ConnectWallet({
    connectedWalletAddress,
    setConnectedWalletAddress,
}) {
    const [connected, setConnected] = React.useState(true);

    async function connectWallet() {
        if (window.ethereum) {
            await provider.send("eth_requestAccounts", [])
            setConnectedWalletAddress(provider.getSigner())
        } else {
            console.error("Please Install Metamask!!!");
        }

    }
    
    return (
        <button className="connect-btn" onClick={connectWallet}>
            {connected ? "Disconnect Wallet" : "Connect Wallet"}
        </button>

    )
}