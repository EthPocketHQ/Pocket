// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Safe} from "@safe/contracts/Safe.sol";
import {Enum} from "@safe/contracts/common/Enum.sol";

contract SafeMock is Safe {
    event ExecutedWith(
        address indexed to,
        uint256 indexed value,
        bytes indexed data,
        Enum.Operation operation
    );

    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation
    ) public override returns (bool success) {
        emit ExecutedWith(to, value, data, operation);
        return super.execTransactionFromModule(to, value, data, operation);
    }
}
