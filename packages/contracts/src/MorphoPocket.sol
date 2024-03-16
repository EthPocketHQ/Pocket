//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {SelfAuthorized} from "@safe/contracts/common/SelfAuthorized.sol";
import {BasePocket} from "./base/BasePocket.sol";
import {IMorpho} from "@morpho-blue/interfaces/IMorpho.sol";
import {MorphoBalancesLib} from "@morpho-blue/libraries/periphery/MorphoBalancesLib.sol";

contract MorphoPocket is BasePocket {
    using MorphoBalancesLib for IMorpho;

    address public constant MORPHO_CONTRACT_ADDRESS = 0x64c7044050Ba0431252df24fEd4d9635a275CB41;
}
