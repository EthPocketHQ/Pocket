// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {ExecutionContext} from "~/utils/ExecutionContext.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {BasePocket} from "~/base/BasePocket.sol";

/// @notice Factory for Pocket contracts extending from BasePocket
/// @dev These functions must be called as a delegatecall from the PocketVault.
contract BasePocketFactory is ExecutionContext {
    error InvalidPocketImplementation();

    /// @notice Creates a new Pocket contract and enables it as a module in a Safe.
    function createDeterministic(
        address pocket,
        bytes32 salt,
        bytes memory data
    ) public onlyDelegateCall returns (address) {
        if (pocket.code.length == 0) {
            revert InvalidPocketImplementation();
        }

        address pocketClone = Clones.cloneDeterministic(pocket, salt);
        BasePocket(pocketClone).setUp(data);

        return pocketClone;
    }

    /// @notice Same as {createDeterministic} but without data.
    function createDeterministic(address pocket, bytes32 salt) public onlyDelegateCall returns (address) {
        return createDeterministic(pocket, salt, new bytes(0));
    }
}
