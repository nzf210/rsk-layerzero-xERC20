include .env
export

op:
	npx hardhat lz:oapp:wire

dev:
	npx hardhat lz:deploy --tags MyOFT
# Verifikasi Contracts
v-bsc:
	npx hardhat verify --network bsc-testnet $(BSC_CONTRACT) "MyOFT" "MOFT" $(ENDPOINT_LZ) $(WALLET_SENDER)

v-eth:
	npx hardhat verify --network bsc-testnet $(BSC_CONTRACT) "MyOFT" "MOFT" $(ENDPOINT_LZ) $(WALLET_SENDER)

v-poly:
	npx hardhat verify --network polygon-amoy $(POLY_CONTRACT) "MyOFT" "MOFT" $(ENDPOINT_LZ) $(WALLET_SENDER)

# Mint Token
mint-bsc:
	npx hardhat lz:oft:mint --contract $(BSC_CONTRACT) --network bsc-testnet --amount 10 --private-key $(PRIVATE_KEY)

mint-eth:
	npx hardhat lz:oft:mint --contract $(ETH_CONTRACT) --network sepolia-testnet --amount 10 --private-key $(PRIVATE_KEY)

mint-amoy:
	npx hardhat lz:oft:mint --contract $(POLY_CONTRACT) --network polygon-amoy --amount 8 --private-key $(PRIVATE_KEY)

eth-to-bsc:
	npx hardhat lz:oft:send \
    --contract $(ETH_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source sepolia-testnet \
	--destination bsc-testnet \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)

bsc-to-eth:
	npx hardhat lz:oft:send \
    --contract $(BSC_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source bsc-testnet \
	--destination sepolia-testnet \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)

bsc-to-amoy:
	npx hardhat lz:oft:send \
    --contract $(BSC_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source bsc-testnet \
	--destination amoy \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)

amoy-to-bsc:
	npx hardhat lz:oft:send \
    --contract $(POLY_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source amoy \
	--destination bsc-testnet \
	--amount 2 \
	--privatekey $(PRIVATE_KEY)

amoy-to-eth:
	npx hardhat lz:oft:send \
    --contract $(POLY_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source amoy \
	--destination sepolia-testnet \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)

eth-to-amoy:
	npx hardhat lz:oft:send \
    --contract $(ETH_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source sepolia-testnet \
	--destination amoy \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)


# ===================================================================================
# Set Peers (Menghubungkan Kontrak Antar Jaringan)
# ===================================================================================
# Menjalankan semua perintah set-peer
set-peers: set-peer-bsc-amoy set-peer-bsc-eth set-peer-amoy-eth

# Menghubungkan BSC Testnet <-> Polygon Amoy
set-peer-bsc-amoy:
	@echo "--- Menghubungkan BSC Testnet -> Polygon Amoy ---"
	npx hardhat set-peer --network bsc-testnet --contract $(BSC_CONTRACT) --destination amoy --peer $(POLY_CONTRACT)
	@echo "--- Menghubungkan Polygon Amoy -> BSC Testnet ---"
	npx hardhat set-peer --network amoy --contract $(POLY_CONTRACT) --destination bsc-testnet --peer $(BSC_CONTRACT)

# Menghubungkan BSC Testnet <-> Sepolia Testnet
set-peer-bsc-eth:
	@echo "--- Menghubungkan BSC Testnet -> Sepolia Testnet ---"
	npx hardhat set-peer --network bsc-testnet --contract $(BSC_CONTRACT) --destination sepolia-testnet --peer $(ETH_CONTRACT)
	@echo "--- Menghubungkan Sepolia Testnet -> BSC Testnet ---"
	npx hardhat set-peer --network sepolia-testnet --contract $(ETH_CONTRACT) --destination bsc-testnet --peer $(BSC_CONTRACT)

# Menghubungkan Polygon Amoy <-> Sepolia Testnet
set-peer-amoy-eth:
	@echo "--- Menghubungkan Polygon Amoy -> Sepolia Testnet ---"
	npx hardhat set-peer --network amoy --contract $(POLY_CONTRACT) --destination sepolia-testnet --peer $(ETH_CONTRACT)
	@echo "--- Menghubungkan Sepolia Testnet -> Polygon Amoy ---"
	npx hardhat set-peer --network sepolia-testnet --contract $(ETH_CONTRACT) --destination amoy --peer $(POLY_CONTRACT)