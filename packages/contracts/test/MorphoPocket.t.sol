// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";
import {MarketParams} from "@morpho-blue/interfaces/IMorpho.sol";
import {MorphoPocket} from "../src/MorphoPocket.sol";
import {BaseTest} from "./Base.t.sol";
import {SafeMock} from "./mocks/Safe.m.sol";
import {console} from "forge-std/Test.sol";
import {PocketManager} from "~/PocketManager.sol";

import {SafeMock} from "./mocks/Safe.m.sol";

contract MorphoPocketTest is BaseTest {
    uint256 constant FOUNDING_VALUE = 10 ether;
    MorphoPocket morphoPocket;

    function setUp() public override {
        super.setUp();
        morphoPocket = new MorphoPocket();
    }

    function test_morphoInstance() public {
        vm.deal(address(morphoPocket), FOUNDING_VALUE);
        assertEq(morphoPocket.getBalance(), FOUNDING_VALUE);
    }

    function test_morphoSetup() public {
        address loanToken = address(1);
        address collateralToken = address(2);
        address oracle = address(3);
        address irm = address(3);
        uint256 lltv = 1;
        bytes memory data = abi.encode(loanToken, collateralToken, oracle, irm, lltv);
        console.logAddress(msg.sender);
        console.logAddress(address(this));
        console.logAddress(address(morphoPocket));
        (address _loanToken, address _collateralToken, address _oracle, address _irm, uint256 _lltv) = morphoPocket.marketParams();
        console.logAddress(_loanToken);
    }
}
