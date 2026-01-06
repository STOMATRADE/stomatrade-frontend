export const STOMATRADE_ADDRESS = '0x0000000000000000000000000000000000000000'; // TODO: Replace with real contract address

export const STOMATRADE_ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "idProject",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "valueProject",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "maxCrowdFunding",
                "type": "uint256"
            }
        ],
        "name": "ProjectCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_cid",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_valueProject",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_maxInvested",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_totalKilos",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_profitPerKillos",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_sharedProfit",
                "type": "uint256"
            }
        ],
        "name": "createProject",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_idProject",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_idProject",
                "type": "uint256"
            }
        ],
        "name": "closeProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_idProject",
                "type": "uint256"
            }
        ],
        "name": "refundProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_idProject",
                "type": "uint256"
            }
        ],
        "name": "withdrawProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_idProject",
                "type": "uint256"
            }
        ],
        "name": "finishProject",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;
