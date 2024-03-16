// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Test.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";
import {PocketManager} from "~/PocketManager.sol";
import {BaseTest} from "./Base.t.sol";
import {SafeMock} from "./mocks/Safe.m.sol";

contract PocketManagerTest is BaseTest {
    PocketManager pocketManager;
    SafeMock pocketVault;

    function setUp() public override {
        super.setUp();

        (address _pocketManager, address _pocketVault) = pocketFactory
            .createDeterministic(address(referenceSafe), bytes32(0));
        pocketVault = SafeMock(payable(_pocketVault));
        pocketManager = PocketManager(_pocketManager);
    }

    function test_setUp() public view {
        assertEq(address(pocketManager.pocketVault()), address(pocketVault));
        assertEq(
            address(pocketManager.referenceSafe()),
            address(referenceSafe)
        );
        assertTrue(pocketVault.isModuleEnabled(address(pocketManager)));
    }

    function test_executeTransaction(
        address to,
        uint256 value,
        bytes calldata data
    ) public {
        (, bytes memory signatures) = _forgeTransactionData(
            to,
            value,
            data,
            referenceSafe.nonce()
        );
        // vm.expectEmit(true, true, true, true);
        // emit SafeMock.ExecutedWith(to, value, data, Enum.Operation.Call);
        vm.deal(address(referenceSafe), value);
        assertTrue(pocketVault.isModuleEnabled(address(pocketManager)));

        pocketManager.executeTransaction(to, value, data, signatures);
    }
}
