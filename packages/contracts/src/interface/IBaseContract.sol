// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {SelfAuthorized} from "@safe/contracts/core/Modifier.sol";

interface IBaseContract {
  function deposit(address token, uint256 amount) external authorized;
  function withdraw(address token, uint256 amount) external authorized;
}
