const ethers = require("ethers");

const providerURL =
  "https://base-sepolia.g.alchemy.com/v2/XYWtS0Pk62Hsq4blQ6uO8OsY4ci5B1jY";
const provider = new ethers.providers.JsonRpcProvider(providerURL);
const address = "0xabdf10bbbccef43942dc8a1da8ae27ddda1d47d8";
const privateKey = "2b15476ff573e983fffc0c165c06544ead87495d299cd7368d157bd6288d1216";

const ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "goalID",
                "type": "uint256"
            }
        ],
        "name": "claimGoalReward",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "kind",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "durationInMonths",
                "type": "uint256"
            }
        ],
        "name": "createGoal",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "userWallet",
                "type": "address"
            }
        ],
        "name": "getUserGoals",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "ID",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "kind",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stakeAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startDateTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endDateTime",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct Zala.Goal[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "goalCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "subscriptionCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "userWiseGoals",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "ID",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "kind",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "stakeAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startDateTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endDateTime",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

function constructContract(smAddress, smABI, privateKey) {
  const signer = new ethers.Wallet(privateKey);
  return new ethers.Contract(smAddress, smABI, signer.connect(provider));
}

const contract = constructContract(address, ABI, privateKey);

export {
    contract,
    address,
    ABI
}