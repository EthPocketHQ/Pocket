// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {SafeProxyFactory, SafeProxy} from "@safe/contracts/proxies/SafeProxyFactory.sol";
import {IProxy} from "@safe/contracts/proxies/SafeProxy.sol";
import {PocketManager} from "./PocketManager.sol";
import {Safe} from "@safe/contracts/Safe.sol";
import {console2} from "forge-std/console2.sol";

contract PocketFactory {
    using Address for address;

    address private immutable __self;

    /// @notice Safe factory contract.
    SafeProxyFactory private immutable _safeProxyFactory;

    /// @notice The address of the PocketManager contract implementation.
    address private immutable _pocketManagerMasterCopy;

    /// @notice Modifier to make a function callable via delegatecall only.
    /// If the function is called via a regular call, it will revert.
    modifier onlyDelegateCall() {
        require(address(this) != __self);
        _;
    }

    /// @notice Creates a new Pocket Factory
    constructor(SafeProxyFactory safeProxyFactory) {
        __self = address(this);
        _safeProxyFactory = safeProxyFactory;
        _pocketManagerMasterCopy = address(new PocketManager());
    }

    /// @notice Creates a new Pocket Manager and its corresponding Pocket Vault.
    /// The PocketVault is another Safe{Wallet} that's controlled by the manager by
    /// using the same permissions as in the reference Safe.
    function createDeterministic(
        address referenceSafe,
        bytes32 salt
    ) public returns (address, address) {
        bytes memory initializer = _buildPocketVaultSetup(salt, referenceSafe);

        // Create another safe controlled by the manager that will serve as a vault
        address pocketVaultAddress = address(
            _safeProxyFactory.createProxyWithNonce(
                IProxy(referenceSafe).masterCopy(),
                initializer,
                uint256(salt)
            )
        );

        return (
            Clones.predictDeterministicAddress(
                _pocketManagerMasterCopy,
                salt,
                pocketVaultAddress
            ),
            pocketVaultAddress
        );
    }

    /// @notice Creates a new Pocket contract and enables it as a module in a Safe.
    /// This method can only be called as a delegatecall from a Safe. This is possible through
    /// the Safe's {setup} method which includes optional delegatecall data.
    function vaultSetup(
        bytes32 salt,
        address referenceSafe
    ) public onlyDelegateCall {
        Safe safe = Safe(payable(address(this)));
        address clone = Clones.cloneDeterministic(
            _pocketManagerMasterCopy,
            salt
        );
        safe.enableModule(clone);
        PocketManager(clone).setupPocket(referenceSafe, (address(this)));
    }

    /// @notice Builds the setup data for the Pocket Vault.
    function _buildPocketVaultSetup(
        bytes32 salt,
        address referenceSafe
    ) private view returns (bytes memory) {
        address[] memory owners = new address[](1);
        owners[0] = address(this);

        return
            abi.encodeCall(
                Safe.setup,
                (
                    owners,
                    1,
                    address(this),
                    abi.encodeCall(this.vaultSetup, (salt, referenceSafe)),
                    address(0),
                    address(0),
                    0,
                    payable(0)
                )
            );
    }
}
