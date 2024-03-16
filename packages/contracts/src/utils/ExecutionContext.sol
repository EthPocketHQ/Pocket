// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

contract ExecutionContext {
    address internal immutable __self;

    constructor() {
        __self = address(this);
    }

    /// @notice Modifier to make a function callable via delegatecall only.
    /// If the function is called via a regular call, it will revert.
    modifier onlyDelegateCall() {
        require(address(this) != __self);
        _;
    }
}
