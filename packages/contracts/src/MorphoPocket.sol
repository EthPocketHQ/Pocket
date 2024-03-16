//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {SelfAuthorized} from "@safe/contracts/common/SelfAuthorized.sol";
import {IBaseContract} from "./interface/IBaseContract.sol";
import {IMorpho, Id, MarketParams} from "@morpho-blue/interfaces/IMorpho.sol";
import {MorphoBalancesLib} from "@morpho-blue/libraries/periphery/MorphoBalancesLib.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {MarketParamsLib} from "@morpho-blue/libraries/MarketParamsLib.sol";
import {SharesMathLib} from "@morpho-blue/libraries/SharesMathLib.sol";

contract MorphoPocket is IBaseContract, SelfAuthorized {
    using MorphoBalancesLib for IMorpho;
    using SafeERC20 for ERC20;
    using SharesMathLib for uint256;
    address private constant ORAGLE = 0x2a01EB9496094dA03c4E364Def50f5aD1280AD72;
    address private constant IRM = 0x870aC11D48B15DB9a138Cf899d20F13F79Ba00BC;
    address private constant COLLATERAL_TOKEN = 0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0;
    address private constant LOAN_TOKEN = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint256 private constant LLTV = 945000000000000000;

    MarketParams public marketParams =
        MarketParams({loanToken: LOAN_TOKEN, collateralToken: COLLATERAL_TOKEN, oracle: ORAGLE, irm: IRM, lltv: LLTV});

    /* IMMUTABLES */
    IMorpho public immutable morpho;

    /* CONSTRUCTOR */
    constructor(address morphoAddress) {
        morpho = IMorpho(morphoAddress);
    }
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit(address token, uint256 amount) public {
        supply(marketParams, amount);
    }
    function withdraw(address token, uint256 amount) public authorized {}
    function getUserSupply(MarketParams memory _marketParams, address token) public authorized returns (uint256) {
        return supplyAsssetUser(marketParams, msg.sender);
    }

    /// @notice Handles the supply of assets by the caller to a specific market.
    /// @param _marketParams The parameters of the market.
    /// @param amount The amount of assets the user is supplying.
    /// @return assetsSupplied The actual amount of assets supplied.
    /// @return sharesSupplied The shares supplied in return for the assets.
    function supply(
        MarketParams memory _marketParams,
        uint256 amount
    ) public returns (uint256 assetsSupplied, uint256 sharesSupplied) {
        ERC20(_markeParams.loanToken).forceApprove(address(morpho), type(uint256).max);
        ERC20(_marketParams.loanToken).safeTransferFrom(msg.sender, address(this), amount);

        uint256 shares;
        address onBehalf = msg.sender;

        (assetsSupplied, sharesSupplied) = morpho.supply(marketParams, amount, shares, onBehalf, hex"");
    }

    function supplyAsssetUser(MarketParams memory _marketParams, address user) public view returns (uint256 totalSupplyAssets) {
        totalSupplyAssets = morpho.expectedSupplyAssets(marketParams, user);
    }
}
