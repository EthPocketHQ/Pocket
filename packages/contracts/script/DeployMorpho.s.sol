//SPDX-License-identifier: UNLICENSED
pragma solidity ^0.8.25;
import {Script} from "forge-std/Script.sol";
import {MorphoPocket} from "../src/MorphoPocket.sol";

contract DeployMorphoPocket is Script {

    address private ORAGLE = 0x2a01EB9496094dA03c4E364Def50f5aD1280AD72;
    address private IRM = 0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC;
    address private COLLATERAL_TOKEN = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
    address private LOAN_TOKEN = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint256 private LLTV = 945000000000000000;
    function run() external returns (MorphoPocket) {
        vm.startBroadcast();
        MorphoPocket morphoPocket = new MorphoPocket();
        bytes memory encode = abi.encode(ORAGLE, IRM, COLLATERAL_TOKEN, LOAN_TOKEN, LLTV);
        vm.stopBroadcast();
        return morphoPocket;
    }
}

contract DeployMorphoPocketDeposit is Script {
    address private constant MORPHO_CONTRACT_ADDRESS = 0xEE4d7F3313CdFf5Bc97BF7401aB530204B2BF7c2;
    address private constant LOAN_TOKEN = 0xEE4d7F3313CdFf5Bc97BF7401aB530204B2BF7c2;
    function run() external {
        vm.startBroadcast();
        MorphoPocket morphoPocket = MorphoPocket(MORPHO_CONTRACT_ADDRESS);
        bytes memory amount = abi.encode(1 ether);
        morphoPocket.deposit(amount);
        vm.stopBroadcast();
    }
}

contract DeployMorphoPocketBalance is Script {
    address private constant MORPHO_CONTRACT_ADDRESS = 0xEE4d7F3313CdFf5Bc97BF7401aB530204B2BF7c2;
    function run() external {
        vm.startBroadcast();
        MorphoPocket morphoPocket = MorphoPocket(MORPHO_CONTRACT_ADDRESS);
        morphoPocket.getBalance();
        vm.stopBroadcast();
    }
}

