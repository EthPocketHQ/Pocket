// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Test} from "forge-std/Test.sol";
import {ModuleManager} from "@safe/contracts/base/ModuleManager.sol";
import {PocketFactory} from "~/PocketFactory.sol";
import {Safe, SafeMock} from "./mocks/Safe.m.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";
import {SafeProxyFactory} from "@safe/contracts/proxies/SafeProxyFactory.sol";
import {console2} from "forge-std/console2.sol";

contract BaseTest is Test {
    // Signers
    uint256 internal signerPrivateKey;
    address internal signer;

    /// Factories
    SafeProxyFactory safeProxyFactory;
    PocketFactory pocketFactory;

    // Mocks
    SafeMock internal referenceSafe;
    address internal receiver = address(0x1234);

    function setUp() public virtual {
        safeProxyFactory = new SafeProxyFactory();
        pocketFactory = new PocketFactory(safeProxyFactory);

        signerPrivateKey = 0xa11ce;
        signer = vm.addr(signerPrivateKey);

        address[] memory owners = new address[](1);
        owners[0] = signer;

        referenceSafe = SafeMock(
            payable(
                safeProxyFactory.createProxyWithNonce(
                    address(new SafeMock()),
                    abi.encodeCall(
                        Safe.setup,
                        (owners, 1, address(0), new bytes(0), address(0), address(0), 0, payable(0))
                    ),
                    0x0
                )
            )
        );
    }

    function _forgeTransactionData(
        address to,
        uint256 value,
        bytes calldata data,
        uint256 nonce
    ) internal view returns (bytes32 txHash, bytes memory signatures) {
        bytes memory txHashData = referenceSafe.encodeTransactionData(
            // Transaction info
            to,
            value,
            data,
            Enum.Operation.Call,
            0,
            // Payment info
            0,
            0,
            address(0),
            address(0),
            // Signature info
            nonce
        );

        txHash = keccak256(txHashData);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(signerPrivateKey, txHash);
        return (txHash, abi.encodePacked(r, s, v));
    }

    function _forceEnableModule(address payable safe, address module) internal {
        // Enable as a module to bypass signatures
        // https://twitter.com/0xVazi/status/1732187067776696655
        vm.store(safe, keccak256(abi.encode(address(module), 1)), bytes32(uint256(1)));
        assertTrue(SafeMock(safe).isModuleEnabled(address(module)));
    }
}
