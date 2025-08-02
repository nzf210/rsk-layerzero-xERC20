// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import '@nomicfoundation/hardhat-verify'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'
import './task/index'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC
const PRIVATE_KEY = process.env.PRIVATE_KEY

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const privateKeyAccounts = PRIVATE_KEY ? [PRIVATE_KEY] : undefined

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC ? { mnemonic: MNEMONIC } : privateKeyAccounts

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        'sepolia-testnet': {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
            url: process.env.RPC_URL_SEPOLIA || 'https://ethereum-sepolia-rpc.publicnode.com',
            accounts,
        },
        'rootstock-testnet': {
            eid: EndpointId.ROOTSTOCK_V2_TESTNET,
            url: process.env.RPC_URL_ROOTSTOCK_TESTNET || 'https://public-node.testnet.rsk.co',
            accounts,
        },
        'bsc-testnet': {
            eid: EndpointId.BSC_V2_TESTNET,
            url: process.env.RPC_BSCTESTNET_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545',
            chainId: 97,
            accounts,
        },
        'polygon-amoy': {
            eid: EndpointId.AMOY_V2_TESTNET,
            url: process.env.RPC_URL_MATIC_TESNET || 'https://rpc-amoy.polygon.technology',
            chainId: 80002,
            accounts,
            // gasPrice: 25000000000,
        },
        hardhat: {
            // Need this for testing because TestHelperOz5.sol is exceeding the compiled contract size limit
            allowUnlimitedContractSize: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
    etherscan: {
        apiKey: {
            sepolia: process.env.ETHERSCAN_API_KEY || '',
            'rootstock-testnet': 'API_KEY',
            // Jaringan baru yang ditambahkan
            polygonAmoy: process.env.POLYGONSCAN_API_KEY || '',
            bscTestnet: process.env.BSCSCAN_API_KEY || '',
        },
        customChains: [
            {
                network: 'rootstock-testnet',
                chainId: 31,
                urls: {
                    apiURL: 'https://rootstock-testnet.blockscout.com/api/',
                    browserURL: 'https://rootstock-testnet.blockscout.com/',
                },
            },
        ],
    },
    sourcify: {
        enabled: true,
    },
}

export default config
