// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {SelfAuthorized} from "@safe/contracts/common/SelfAuthorized.sol";
import {ModuleManager} from "@safe/contracts/base/ModuleManager.sol";
import {ExecutionContext} from "~/utils/ExecutionContext.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

/// @notice BasePocket is a contract with the basic functionality for depositing and withdrawing tokens
/// from a PocketVault
abstract contract BasePocket is SelfAuthorized, ExecutionContext, Initializable {
    /// @notice Set up the pocket and enables it as a module on its corresponding vault
    function setUp() public authorized initializer {
        ModuleManager(msg.sender).enableModule(__self);
    }

    /// @notice Move funds from the PocketVault to another service
    function deposit(address token, uint256 amount) external authorized {}

    /// @notice Claim funds from another service to the PocketVault
    function withdraw(address token, uint256 amount) external authorized {}

    /// @notice Execute logic in a third-party contract (eg. a swap)
    function execute(address token, uint256 amount) external authorized {}
}
