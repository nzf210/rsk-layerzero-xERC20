import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { TwoWayConfig, generateConnectionsConfig } from '@layerzerolabs/metadata-tools'

const chains = {
    amoy: { eid: EndpointId.AMOY_V2_TESTNET, contractName: 'MyOFT' },
    sepolia: { eid: EndpointId.SEPOLIA_V2_TESTNET, contractName: 'MyOFT' },
    bsc: { eid: EndpointId.BSC_V2_TESTNET, contractName: 'MyOFT' },
    rootstock: { eid: EndpointId.ROOTSTOCK_V2_TESTNET, contractName: 'MyOFT' },
}

// ✅ KONFIGURASI OPSI YANG BENAR
const EVM_LZ_RECEIVE_AND_AIRDROP: any = [
    {
        // Kontainer utama harus bertipe COMPOSE
        optionType: ExecutorOptionType.COMPOSE,
        // Tentukan jenis pesan mana yang akan dikenai opsi ini
        msgType: 1, // <--- TAMBAHKAN BARIS INI
        // Indeks untuk urutan eksekusi
        index: 0,
        // Array yang berisi instruksi yang akan digabungkan
        compose: [
            {
                // Instruksi pertama: alokasi gas untuk lzReceive
                index: 0,
                optionType: ExecutorOptionType.LZ_RECEIVE,
                gas: 80000,
                value: 0, // value harus 0 untuk LZ_RECEIVE
            },
            {
                // Instruksi kedua: airdrop gas asli ke penerima
                index: 1,
                optionType: ExecutorOptionType.NATIVE_DROP,
                amount: 1000, // ubah jika ingin mengirim gas
            },
        ],
    },
]

const pathways: TwoWayConfig[] = [
    // Gunakan konfigurasi opsi yang sudah benar
    [
        chains.amoy,
        chains.sepolia,
        [['LayerZero Labs'], []],
        [1, 2],
        [EVM_LZ_RECEIVE_AND_AIRDROP, EVM_LZ_RECEIVE_AND_AIRDROP],
    ],
    [
        chains.amoy,
        chains.bsc,
        [['LayerZero Labs'], []],
        [1, 2],
        [EVM_LZ_RECEIVE_AND_AIRDROP, EVM_LZ_RECEIVE_AND_AIRDROP],
    ],
    [
        chains.rootstock,
        chains.sepolia,
        [['LayerZero Labs'], []],
        [1, 2],
        [EVM_LZ_RECEIVE_AND_AIRDROP, EVM_LZ_RECEIVE_AND_AIRDROP],
    ],
]

export default async function config() {
    const connections = await generateConnectionsConfig(pathways)
    return {
        contracts: Object.values(chains).map((c) => ({ contract: c })),
        connections,
    }
}
