// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {Safe} from "@safe/contracts/Safe.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";

/// @title PocketManager - A module that copies other Safe's permissions so that it acts as a
/// dettached extension of the original Safe. Ideal for separating funds between two safes with different
/// execution requirements (e.g. one may have a delay while the other is quicker to execute).
contract PocketManager {
    address private _safe;

    event ExecutedPocketTransaction(uint32 nonce, bool success);
    error InvalidPocketSignature(bytes signature);

    constructor(address safe) {
        _safe = safe;
    }

    /// @notice Returns the Safe{Wallet} instance associated with this module
    function safe() internal view returns (Safe) {
        return Safe(_safe);
    }

    /// @notice Executes a transaction from the associated Safe{Wallet} Smart Account
    /// using the signature of the Safe{Wallet} owners.
    /// Executes a `operation` {0: Call, 1: DelegateCall}} transaction to `to` with `value` (Native Currency)
    ///          and pays `gasPrice` /// `gasLimit` in `gasToken` token to `refundReceiver`.
    /// @dev The fees are always transferred, even if the user transaction fails.
    ///      This method doesn't perform any sanity check of the transaction, such as:
    ///      - if the contract at `to` address has code or not
    ///      - if the `gasToken` is a contract or not
    ///      It is the responsibility of the caller to perform such checks.
    /// @param to Destination address of Safe transaction.
    /// @param value Ether value of Safe transaction.
    /// @param data Data payload of Safe transaction.
    /// @param operation Operation type of Safe transaction.
    /// @param safeTxGas Gas that should be used for the Safe transaction.
    /// @param baseGas Gas costs that are independent of the transaction execution(e.g. base transaction fee, signature check, payment of the refund)
    /// @param gasPrice Gas price that should be used for the payment calculation.
    /// @param gasToken Token address (or 0 if ETH) that is used for the payment.
    /// @param refundReceiver Address of receiver of gas payment (or 0 if tx.origin).
    /// @param signatures Signature data that should be verified.
    ///                   Can be packed ECDSA signature ({bytes32 r}{bytes32 s}{uint8 v}), contract signature (EIP-1271) or approved hash.
    /// @return success Boolean indicating transaction's success.
    function executeTransaction(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation,
        uint256 safeTxGas,
        uint256 baseGas,
        uint256 gasPrice,
        address gasToken,
        address payable refundReceiver,
        bytes memory signatures
    ) public virtual returns (bool) {
        bytes32 txHash;
        // Use scope here to limit variable lifetime and prevent `stack too deep` errors
        {
            bytes memory txHashData = encodeTransactionData(
                // Transaction info
                to,
                value,
                data,
                operation,
                safeTxGas,
                // Payment info
                baseGas,
                gasPrice,
                gasToken,
                refundReceiver,
                // Signature info
                nonce
            );
            // Increase nonce and execute transaction.
            nonce++;
            txHash = keccak256(txHashData);
            safe.checkSignatures(txHash, txHashData, signatures);
        }

        bool success = _safe.execTransactionFromModule(
            to,
            value,
            data,
            operation
        );

        emit ExecutedPocketTransaction(currentNonce, success);

        return success;
    }
}
