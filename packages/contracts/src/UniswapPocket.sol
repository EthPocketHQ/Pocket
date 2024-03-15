// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {IBasePocket} from "interface/IBasePocket.sol";
import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";
import {BaseHook} from "@uniswap/v4-periphery/contracts/BaseHook.sol";

contract UniswapPocket is IBasePocket, BaseHook {

  constructor(IPoolManager _poolManager) BaseHook(_poolManager) {}

  function getHooksCalls() public pure override returns (Hooks.Calls memory) {
    return Hooks.Calls({
      beforeInitialize: false,
      afterInitialize: false,
      beforeModifyPosition: false,
      afterModifyPosition: false,
      beforeSwap: true,
      afterSwap: false,
      beforeDonate: false,
      afterDonate: false
    });
  }

  function beforeSwap(
    address, 
    PoolKey calldata, 
    IPoolManager.SwapParams calldata, 
    bytes calldata
  ) external override returns (bytes4) {
    
    // @TODO: code
    return BaseHook.beforeSwap.selector;
  }
}
