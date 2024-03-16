// SPDX-License-Identifier: MIT

pragma solidity ^0.8.25;

import {LimitOrder, PoolKey, Epoch, IPoolManager} from "./custom/LimitOrder.sol";
import {BasePocket} from "./base/BasePocket.sol";

contract LimitOrderPocket is LimitOrder, BasePocket {
    constructor(IPoolManager _poolManager) LimitOrder(_poolManager) {}

    /// @notice Place an limit order. See {place}.
    function deposit(bytes memory data) external override authorized {
        (PoolKey memory key, int24 tickLower, bool zeroForOne, uint128 liquidity) = abi.decode(
            data,
            (PoolKey, int24, bool, uint128)
        );
        place(key, tickLower, zeroForOne, liquidity);
    }

    /// @notice Removes liquidity from a filled limit order. See {withdraw}.
    function withdraw(bytes memory data) external override authorized {
        (Epoch epoch, address to) = abi.decode(data, (Epoch, address));
        withdraw(epoch, to);
    }

    /// @notice Kills a limit order. See {kill}.
    function execute(bytes memory data) external override authorized {
        (PoolKey memory key, int24 tickLower, bool zeroForOne, address to) = abi.decode(
            data,
            (PoolKey, int24, bool, address)
        );
        kill(key, tickLower, zeroForOne, to);
    }
}
