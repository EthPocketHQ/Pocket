// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {BasePocket} from "./base/BasePocket.sol";
import {PoolKey} from "@uniswap/v4-core/src/types/PoolKey.sol";
import {BalanceDelta} from "@uniswap/v4-core/src/types/BalanceDelta.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {ILockCallback} from "@uniswap/v4-core/src/interfaces/callback/ILockCallback.sol";

error MethodNotImplemented();

contract SwapPocket is BasePocket {
    IPoolManager public poolManager;

    function setupPocket(IPoolManager _poolManager) public initializer {
        poolManager = _poolManager;
    }

    function deposit(bytes memory data) external override authorized {
        error MethodNotImplemented();
    }

    function withdraw(bytes memory data) external override authorized {
        error MethodNotImplemented();
    }

    function execute(bytes memory data) external override authorized {
        poolManager.lock(data);
    }

    function lockAcquired(bytes calldata data) external returns (bytes memory) {
        (PoolKey memory poolKey, IPoolManager.SwapParams memory params) = abi.decode(
            data,
            (PoolKey, IPoolManager.SwapParams)
        );

        BalanceDelta delta = poolManager.swap(poolKey, params, "");
        return abi.encode(delta);
    }
}
