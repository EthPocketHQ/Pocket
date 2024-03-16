// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

interface IBaseContract {
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount) external;
}
