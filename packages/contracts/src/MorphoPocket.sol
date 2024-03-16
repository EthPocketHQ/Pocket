//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import {SelfAuthorized} from "@safe/contracts/common/SelfAuthorized.sol";
import {IMorpho, MarketParams} from "@morpho-blue/interfaces/IMorpho.sol";
import {BasePocket} from "~/base/BasePocket.sol";
import {IMorpho} from "@morpho-blue/interfaces/IMorpho.sol";

import {MorphoBalancesLib} from "@morpho-blue/libraries/periphery/MorphoBalancesLib.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {MarketParamsLib} from "@morpho-blue/libraries/MarketParamsLib.sol";
import {SharesMathLib} from "@morpho-blue/libraries/SharesMathLib.sol";

contract MorphoPocket is BasePocket {
    using MorphoBalancesLib for IMorpho;
    using SafeERC20 for ERC20;
    using SharesMathLib for uint256;

    address private constant MORPHO_ADDRRESS = 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb;

    MarketParams public marketParams;

    /* IMMUTABLES */
    IMorpho public morpho;

    /* CONSTRUCTOR */
    constructor() {
        morpho = IMorpho(MORPHO_ADDRRESS);
        _disableInitializers();
    }

    function setUp(bytes memory data) public virtual override authorized initializer {
        (address oracle, address irm, address collateralToken, address loanToken, uint lltv) = abi.decode(
            data,
            (address, address, address, address, uint256)
        );
        marketParams = MarketParams({
            loanToken: loanToken,
            collateralToken: collateralToken,
            oracle: oracle,
            irm: irm,
            lltv: lltv
        });
    }
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function deposit(uint256 amount) public authorized {
        supply(amount);
    }

    function supply(uint256 amount) public returns (uint256 assetsSupplied, uint256 sharesSupplied) {
        ERC20(marketParams.loanToken).forceApprove(address(morpho), type(uint256).max);
        ERC20(marketParams.loanToken).safeTransferFrom(msg.sender, address(this), amount);

        uint256 shares;
        address onBehalf = msg.sender;

        (assetsSupplied, sharesSupplied) = morpho.supply(marketParams, amount, shares, onBehalf, hex"");
    }

    function supplyCollateral(uint256 amount) public {
        ERC20(marketParams.collateralToken).forceApprove(address(morpho), type(uint256).max);
        ERC20(marketParams.collateralToken).safeTransferFrom(msg.sender, address(this), amount);
        address onBehalf = msg.sender;
        morpho.supplyCollateral(marketParams, amount, onBehalf, hex"");
    }

    function supplyAsssetUser(address user) public view returns (uint256 totalSupplyAssets) {
        totalSupplyAssets = morpho.expectedSupplyAssets(marketParams, user);
    }

    function getUserSupply() public view authorized returns (uint256) {
        return supplyAsssetUser(msg.sender);
    }
}
