// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Safe} from "@safe/contracts/Safe.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";
import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

/// @title PocketManager - A module that copies other Safe's permissions so that it acts as a
/// dettached extension of the original Safe. Ideal for separating funds between two safes with different
/// execution requirements (e.g. one may have a delay while the other is quicker to execute).
contract PocketManager is Nonces, Initializable {
    struct PocketManagerStorage {
        address _referenceSafe;
        address _pocketVault;
    }

    event ExecutedPocketTransaction(uint256 nonce, bool success);
    error InvalidPocketSignature(bytes signature);

    // keccak256(abi.encode(uint256(keccak256("pocket.storage.PocketManager")) - 1)) & ~bytes32(uint256(0xff))
    bytes32 constant PocketManagerStorageLocation = 0x10402ce5b06e792b45757dab2f6ba192bb7761b5295dc2a2997e5aaf4ff03400;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// @notice Initializes the contract with a reference safe
    /// @param _referenceSafe The address of the Safe{Wallet} Smart Account to obey permissions from
    /// @param _pocketVault The address of the Safe{Wallet} owned by this PocketManager
    function setupPocket(address _referenceSafe, address _pocketVault) public initializer {
        _getPocketManagerStorage()._referenceSafe = _referenceSafe;
        _getPocketManagerStorage()._pocketVault = _pocketVault;
    }

    /// @notice Returns the address of the Safe{Wallet} Smart Account to obey permissions from
    function referenceSafe() public view returns (Safe) {
        return Safe(payable(_getPocketManagerStorage()._referenceSafe));
    }

    /// @notice Returns the address of the Safe{Wallet} owned by this PocketManager
    function pocketVault() public view returns (Safe) {
        return Safe(payable(_getPocketManagerStorage()._pocketVault));
    }

    /// @notice Executes a transaction from the associated Safe{Wallet} Smart Account
    /// using the signature of the Safe{Wallet} owners.
    /// @dev The fees are always transferred, even if the user transaction fails.
    ///      This method doesn't perform any sanity check of the transaction, such as:
    ///      - if the contract at `to` address has code or not
    ///      It is the responsibility of the caller to perform such checks.
    /// @param to Destination address of Safe transaction.
    /// @param value Ether value of Safe transaction.
    /// @param data Data payload of Safe transaction.
    /// @param signatures Signature data that should be verified.
    ///                   Can be packed ECDSA signature ({bytes32 r}{bytes32 s}{uint8 v}), contract signature (EIP-1271) or approved hash.
    /// @return success Boolean indicating transaction's success.
    function executeTransaction(
        address to,
        uint256 value,
        Enum.Operation operation,
        bytes calldata data,
        bytes memory signatures
    ) external virtual returns (bool) {
        bytes memory txHashData;

        Safe pocketSafe = pocketVault();
        Safe originalSafe = referenceSafe();
        uint256 currentNonce = pocketSafe.nonce();

        txHashData = originalSafe.encodeTransactionData(
            // Transaction info
            to,
            value,
            data,
            operation,
            0,
            // Payment info
            0,
            0,
            address(0),
            address(0),
            // Signature info
            currentNonce
        );

        referenceSafe().checkSignatures(keccak256(txHashData), txHashData, signatures);

        bool success = pocketSafe.execTransactionFromModule(to, value, data, operation);

        emit ExecutedPocketTransaction(currentNonce, success);

        return success;
    }

    /// @notice Get EIP-7201 storage
    function _getPocketManagerStorage() private pure returns (PocketManagerStorage storage $) {
        assembly {
            $.slot := PocketManagerStorageLocation
        }
    }
}
