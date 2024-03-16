//SPDX-License-identifier: UNLICENSED
pragma solidity ^0.8.25;
import {Script} from "forge-std/Script.sol";
import {MorphoPocket} from "../src/MorphoPocket.sol";

contract DeployMorphoPocket is Script {
    address private constant MORPHO_ADDRRESS = 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb;
    function run() external returns (MorphoPocket) {
        vm.startBroadcast();
        MorphoPocket morphoPocket = new MorphoPocket(MORPHO_ADDRRESS);
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
        morphoPocket.deposit(LOAN_TOKEN, 1 ether);
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
