//SPDX-License-identifier: UNLICENSED
pragma solidity ^0.8.25;
import {Script} from "forge-std/Script.sol";
import {PocketFactory} from "../src/PocketFactory.sol";
import {BasePocketFactory} from "../src/base/BasePocketFactory.sol";
import {MorphoPocket} from "../src/MorphoPocket.sol";
import {SafeProxyFactory, SafeProxy} from "@safe/contracts/proxies/SafeProxyFactory.sol";

contract DeployPocketFactory is Script {
    function run() external returns (PocketFactory) {
        vm.startBroadcast();
        PocketFactory pocketFactory = new PocketFactory(SafeProxyFactory(0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2));
        vm.stopBroadcast();
        return pocketFactory;
    }
}
contract DeployBasePocketFactory is Script {
    function run() external returns (BasePocketFactory) {
        vm.startBroadcast();
        BasePocketFactory basePocketFactory = new BasePocketFactory();
        vm.stopBroadcast();
        return basePocketFactory;
    }
}

contract DeployMorphoPocket is Script {
    function run() external returns (MorphoPocket) {
        vm.startBroadcast();
        MorphoPocket morphoPocket = new MorphoPocket();
        vm.stopBroadcast();
        return morphoPocket;
    }
}
