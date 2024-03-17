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
    <img src="https://i.ibb.co/fQTyzNt/Pocket-Landing-Taman-o-original-1.png">
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


![Pocket](https://i.ibb.co/Th62q8H/Screenshot-2024-03-17-at-12-23-47-AM.png)

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


Gnosis Pay is a non-custodial service that allows users to pay directly from their wallets using a Visa card. Gnosis Pay is built on top of Safe{Wallet} and includes a delay module that guarantees the merchants will have their funds available after a payment was made with the card.

However, this mechanism adds some limitations for the Safe, so it's not possible to operate the balances of the account without the delay module. This means that the Safe can't be used for other purposes while the delay module is active.

The goal of this project is to create an innovative mechanism to provide an secondary account that's seamless to operate and has the same security guarantees as the underlying Gnosis Pay Safe{Wallet}

### Goals

The smart contracts of the project are built with 2 main goals in mind:

- Allow a Gnosis Pay user to setup an account instantly.
- Standardize integrations for DeFi protocols and other services with the Gnosis Pay underlying wallet.

### Components

The smart contracts for the project are composed of 4 main components:

- PocketVault: A Safe{Wallet} with no owners that can only be operated through a [PocketManager](./packages/contracts/src/PocketManager.sol) module.
- [PocketManager](./packages/contracts/src/PocketManager.sol)): A module that allows the PocketVault to be operated by the same owners of a another Safe{Wallet}.
- [PocketFactory](.packages/contracts/src/PocketFactory.sol): A factory that allows the creation of a PocketVault and a PocketManager in a single transaction for a Safe{Wallet}. Ideally, this Safe{Wallet} is the Gnosis Pay's underlying one.
- Pockets: Pockets are a standard interface for DeFi protocols and other services to interact with the PocketVault. The base implementation for protocols to hook on Pocket is the [BasePocket](./packages/contracts/src/base/BasePocket.sol) contract.

### User Journey

Creating a Gnosis Pay Account

Users are expected to have already created a Gnosis Safe module and have a Safe{Wallet} with the delay module enabled. The user journey for creating a Gnosis Pay account is as follows:

![User Journey](https://i.ibb.co/HCz3TSG/Screenshot-2024-03-17-at-12-14-23-AM.png)


Next steps are creating a PocketVault and a Pocket Manager
Creating an application Pocket.


You can check more details about user journey, contract design and Pocket's architecture in [DESIGN.md](https://github.com/EthPocketHQ/Pocket/blob/main/DESIGN.md)


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
