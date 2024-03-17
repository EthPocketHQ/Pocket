// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {SafeMock} from "./Safe.m.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";

contract Executor {
    SafeMock _safe;
    constructor(SafeMock safe) {
        _safe = safe;
    }
    function executeTransaction(address to, uint256 value, bytes memory data, Enum.Operation operation) public {
        _safe.execTransactionFromModule(to, value, data, operation);
    }
}
