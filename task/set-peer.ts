// tasks/set-peer.ts
import { hexZeroPad } from '@ethersproject/bytes'
import { task } from 'hardhat/config'

import { getEidForNetworkName } from '@layerzerolabs/devtools-evm-hardhat'
import '@nomiclabs/hardhat-ethers'

// ABI minimal yang dibutuhkan untuk fungsi setPeer
const OAPP_ABI = ['function setPeer(uint32 _eid, bytes32 _peer) external']

task('set-peer', 'Set a peer for an OApp contract')
    .addParam('contract', 'The address of the source OApp contract')
    .addParam('destination', 'The name of the destination network (e.g., bsc-testnet)')
    .addParam('peer', 'The address of the peer contract on the destination network')
    .setAction(async (taskArgs, hre) => {
        const { contract, destination, peer } = taskArgs
        const { ethers, network } = hre

        // Dapatkan Endpoint ID (EID) untuk jaringan tujuan
        const destinationEid = getEidForNetworkName(destination)

        console.log(`----------------------------------------------------`)
        console.log(`🔗 Setting Peer on network: ${network.name}`)
        console.log(`- Source Contract: ${contract}`)
        console.log(`- Destination Network: ${destination} (EID: ${destinationEid})`)
        console.log(`- Peer Contract: ${peer}`)
        console.log(`----------------------------------------------------`)

        // Dapatkan signer dari private key yang ada di hardhat.config.ts
        const [signer] = await ethers.getSigners()
        console.log(`\nUsing signer: ${signer.address}`)

        // Buat instance kontrak OApp
        const oappContract = new ethers.Contract(contract, OAPP_ABI, signer)

        // Format alamat peer menjadi bytes32
        const peerBytes32 = hexZeroPad(peer, 32)
        console.log(`\nFormatted Peer Address (bytes32): ${peerBytes32}`)

        try {
            // Panggil fungsi setPeer di kontrak
            console.log(`\nSending setPeer transaction...`)
            const tx = await oappContract.setPeer(destinationEid, peerBytes32)

            console.log(`\nTransaction sent. Hash: ${tx.hash}`)
            console.log(`Waiting for confirmation...`)

            // Tunggu transaksi dikonfirmasi
            await tx.wait()

            console.log(`\n✅ Peer set successfully!`)
            console.log(`----------------------------------------------------\n`)
        } catch (error) {
            console.error(`\n❌ Failed to set peer.`)
            if (error instanceof Error) {
                console.error(`Reason: ${error.message}`)
            } else {
                console.error(error)
            }
            console.log(`----------------------------------------------------\n`)
        }
    })
