-include .env


build:; forge build --contracts src/MorphoPocket.sol --use  /Users/jonathan/.cargo/bin/solc

deploy-goerlic:
	forge script script/DeployMorpho.s.sol:DeployMorpho --rpc-url $(GOERLIC_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvvv

deploy-custom:
	forge script script/DeployMorpho.s.sol:DeployMorphoPocket --rpc-url $(CUSTOM_RPC_URL) --private-key $(CUSTOM_PRIVATE_KEY) --broadcast  --use /Users/jonathan/.cargo/bin/solc  -vvvvv

deploy-deposit:
	forge script script/DeployMorpho.s.sol:DeployMorphoPocketDeposit --rpc-url $(CUSTOM_RPC_URL) --private-key $(CUSTOM_PRIVATE_KEY) --broadcast  --use /Users/jonathan/.cargo/bin/solc --ffi -vvvvv


deploy-supply:
	forge script script/DeployMorpho.s.sol:DeployMorphoPocketSupply --rpc-url $(CUSTOM_RPC_URL) --private-key $(CUSTOM_PRIVATE_KEY) --broadcast  --use /Users/jonathan/.cargo/bin/solc --ffi -vvvvv

deploy-balance:
	forge script script/DeployMorpho.s.sol:DeployMorphoPocketBalance --rpc-url $(CUSTOM_RPC_URL) --private-key $(CUSTOM_PRIVATE_KEY) --broadcast  --use /Users/jonathan/.cargo/bin/solc --ffi -vvvvv

deploy-ganache:
	forge script script/DeployMorpho.s.sol:DeployMorpho --rpc-url $(GANACHE_RPC_URL) --private-key $(GANACHE_PRIVATE_KEY) --broadcast --use /Users/jonathan/.cargo/bin/solc -vvvvv

deploy-pocket-factory:
	forge script script/PocketDeploy.s.sol:DeployPocketFactory --rpc-url $(CUSTOM_RPC_URL) --private-key $(CUSTOM_PRIVATE_KEY) --broadcast  --use /Users/jonathan/.cargo/bin/solc --ffi -vvvvv

deploy-pocket-base-factory:
	forge script script/PocketDeploy.s.sol:DeployBasePocketFactory --rpc-url $(CUSTOM_RPC_URL) --private-key $(CUSTOM_PRIVATE_KEY) --broadcast  --use /Users/jonathan/.cargo/bin/solc --ffi -vvvvv

deploy-morpho-pocket:
	forge script script/PocketDeploy.s.sol:DeployMorphoPocket --rpc-url $(CUSTOM_RPC_URL) --private-key $(CUSTOM_PRIVATE_KEY) --broadcast  --use /Users/jonathan/.cargo/bin/solc --ffi -vvvvv
