# Pocket

<a name="readme-top"></a>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

</div>

<!-- PROJECT INTRO -->

<!-- Notas:

No olvidar conectar los repos o folders
No olvidar subir el link de la landing para test 
No olvidar subir el link del demo 

 -->

<br />
<div align="center">
  <a href="https://github.com/EthPocketHQ/Pocket">
    <img src="https://i.ibb.co/s2vNV3V/Pocket-Landing-Taman-o-original.png">
  </a>

 <h3 align="center"> 🔵 Seamless Financial Management 🔵</h3>

  <p align="center">

  [🇬🇧 Eth Global London 2024 Hackaton Project 🇬🇧](https://ethglobal.com/events/london2024/)

   <br />
    <a href="https://github.com/EthPocketHQ/Pocket"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/EthPocketHQ/Pocket">View Demo</a>
    ·
    <!-- Agregar Demo Link Aquí -->
    <a href="https://github.com/EthPocketHQ/Pocket">Report Bug</a>
    ·
    <a href="https://github.com/EthPocketHQ/Pocket">Request Feature</a>
  </p>
</div>

<br />


<!-- TABLE OF CONTENTS -->

# Table of Contents 

1. [About de Project](#about-the-project)
2. [Demo](#demo)
3. [Built With](#built-with)
4. [How it works](#how-it-works)
5. [Team](#team)
6. [Acknowledgments](#acknowledgments)

<br />


<!-- ABOUT THE PROJECT -->

# About The Project


<br />


![Pocket](https://i.ibb.co/5Lzf92J/Screenshot-2024-03-16-at-2-47-58-PM.png)

Pocket is a Gnosis Pay savings account that enables seamless integration with on-chain liquidity providers and interest-earning tokens. 

This is possible through an on-chain custodial for your savings that's capable of adding small financial modules called "pockets", these handle the logic of integrations with more complex financial services.




<p align="right">(<a href="#readme-top">back to top</a>)</p>


# Demo

<!-- INSERTAR DEMO AQUÍ-->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Built With


Pocket is proudly supported by the following sponsors:


* [![Gnosis Pay][gnosispay.com]][gnosispay-url]
* [![Safe][safe.global]][safe-url]
* [![Uniswap][uniswap.org]][uniswap-url]
* [![Panceswap][pancakeswap.finance]][pancakeswap-url]
* [![Morpho][morpho.org]][morpho-url]
* [![Nouns][nouns.wtf]][nouns-url]


These powerful partners have helped us create a seamless user experience and ensure the scalability and reliability of our project.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED   -->


# How it Works

We leverage Safe and Safe modules for what we call the "PocketVault". Each vault is a secondary Safe Wallet that we deploy through a factory without owners and only a single module enabled to operate it. This module is called "PocketManager" and it allows executing transactions on the PocketVault by validating and authorizing signatures exactly as if it were the Gnosis Pay underlying Safe.

Given the PocketVault is only operated by the Gnosis Pay owner's, the vault works as an extension that's not restricted by the Gnosis Pay delay module.

Gnosis Pay uses a SafeWallet that's restricted by a delay module. Our factory creates another Safe{Wallet} with no owner addresses and just the PocketManager enabled.
New pockets for different investment strategies and services are developed on top of a BasePocket contract we've developed and includes logic for authorizing calls from the PocketVault, set up, withdrawals and deposits. These are enabled as modules for the PocketVault (Safe modules)

New protocols can build on top of the BasePocket to enable use cases for Gnosis Pay users. In this way, we've been able to integrate the following:

- Pocket limit orders using hooks in Uniswap V4 and Pancakeswap V4
- Seamless liquidity between sDAI and EURe by enabling a user to make instant swaps through its Pocket.
- Easy lending through Morpho vaults. A pocket deposits users funds into a morpho vault and is managed by the PocketManager.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->



# Team


-Nelson Galdeman ([@neeel_eth](https://twitter.com/neeel_eth)): Smart Contract Developer at [Swapr](https://twitter.com/Swapr_dapp) and [Stackly]( https://twitter.com/Stacklydapp).
<br />
-Ernesto García ([@ernestognw](https://twitter.com/ernestognw)): Smart Contract Engineer at [OpenZeppelin](https://twitter.com/OpenZeppelin).
<br />
-Angela Ocando ([@ocandocrypto](https://twitter.com/ocandocrypto)): Core Contributor at [Web3 Citizen](https://twitter.com/web3citizenxyz) and Arbitrum DAO Delegate.
<br />
-Jonathan Diaz ([@jonthdiaz](https://twitter.com/jonthdiaz)): Software Architect at Playvox and [WTF Academy Contributor](https://twitter.com/WTFAcademy_).
<br />
-Sebastian Guaqueta ([@scguaquetam](https://twitter.com/scguaquetam)): Frontent Integration (Stealth Company), [Push Protocol](https://twitter.com/pushprotocol) and [WTF Academy Contributor](https://twitter.com/WTFAcademy_).
<br />


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->

# Acknowledgments

<!-- 


We would like to express our gratitude to the following resources that have been invaluable in the development of Stake Garden:

* [1inch Docs](https://portal.1inch.dev/documentation/authentication)
* [Metamask SDK](https://docs.metamask.io/wallet/how-to/use-sdk/)
* [The Graph Docs](https://thegraph.com/docs)
* [Nouns Artwork](https://nouns.center/assets)

-->

<!-- * [Filecoin Docs](https://docs.filecoin.io/) -->

These resources have provided valuable insights, tools, and inspiration throughout the development process. We appreciate their contributions to the web development community.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS -->

[contributors-shield]: https://img.shields.io/github/contributors/EthPocketHQ/Pocket.svg?style=for-the-badge

[contributors-url]: https://github.com/EthPocketHQ/Pocket/graphs/contributors

[stars-shield]: https://img.shields.io/github/stars/EthPocketHQ/Pocket.svg?style=for-the-badge

[stars-url]: https://github.com/EthPocketHQ/Pocket/stargazers

[issues-shield]: https://img.shields.io/github/issues/EthPocketHQ/Pocket.svg?style=for-the-badge&logoColor=white

[issues-url]: https://github.com/EthPocketHQ/Pocket/issues


<!-- SPONSORS -->


[gnosispay.com]:https://img.shields.io/badge/gnosispay-6FAEF6?style=for-the-badge&logo=gnosispay&logoColor=white
[gnosispay-url]:https://gnosispay.com

[safe.global]:https://img.shields.io/badge/safe-6FAEF6?style=for-the-badge&logo=safe&logoColor=white
[safe-url]:https://safe.global

[uniswap.org]:https://img.shields.io/badge/uniswap-6FAEF6?style=for-the-badge&logo=uniswap&logoColor=white
[uniswap-url]:https://uniswap.org

[pancakeswap.finance]:https://img.shields.io/badge/pancakeswap-6FAEF6?style=for-the-badge&logo=pancakeswap&logoColor=white
[pancakeswap-url]:https://pancakeswap.finance

[morpho.org]:https://img.shields.io/badge/morpho-6FAEF6?style=for-the-badge&logo=morpho&logoColor=white
[morpho-url]:https://morpho.org/

[nouns.wtf]:https://img.shields.io/badge/nounsdao-6FAEF6?style=for-the-badge&logo=nounsdao&logoColor=white
[Nouns-url]:https://nouns.wtf


* [![Gnosis Pay][gnosispay.com]][gnosispay-url]
* [![Safe][safe.global]][safe-url]
* [![Uniswap][uniswap.org]][uniswap-url]
* [![Pancakeswap][pancakeswap.finance]][pancakeswap-url]
* [![Morpho][morpho.org]][morpho-url]
* [![Nouns][nouns.wtf]][nouns-url]
