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
    --contract $(POLY_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source bsc-testnet \
	--destination polygon-amoy \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)

amoy-to-bsc:
	npx hardhat lz:oft:send \
    --contract $(BSC_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source polygon-amoy \
	--destination bsc-testnet \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)

amoy-to-eth:
	npx hardhat lz:oft:send \
    --contract $(POLY_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source polygon-amoy \
	--destination sepolia-testnet \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)

eth-to-amoy:
	npx hardhat lz:oft:send \
    --contract $(ETH_CONTRACT) \
	--recipient $(WALLET_RECEIVER) \
	--source sepolia-testnet \
	--destination polygon-amoy \
	--amount 1 \
	--privatekey $(PRIVATE_KEY)