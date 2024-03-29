import { PocketType } from "@/pages";
import {
  BasePocketFactory,
  COLLATERAL_TOKEN,
  IRM,
  LLTV,
  LOAN_TOKEN,
  MorphoPocket,
  ORACLE,
} from "@/utils/contracts";
import { ethers } from "ethers";
import React, { useState } from "react";
import {
  useWriteContract,
  useSignTypedData,
  usePublicClient,
  useChainId,
  useWalletClient,
  useSimulateContract,
} from "wagmi";
import Cookies from "js-cookie";
import PocketVaultABI from "../../utils/abi/PocketVault.json";
import BasePocketFactoryABI from "../../utils/abi/BasePocketFactory.json";
import PocketManagerABI from "../../utils/abi/PocketManager.json";
import { encodeFunctionData } from "viem";
type Props = {
  type: PocketType;
};
const DepositModal = ({ type }: Props) => {
  const { writeContract } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const [activated, setActivated] = useState(false);
  const { signTypedData, signTypedDataAsync } = useSignTypedData();
  const client = usePublicClient();
  const walletClient = useWalletClient();
  const chainId = useChainId();

  const [morphoAmount, setMorphoAmount] = useState("0");
  const depositMorpho = async () => {
    try {
      setLoading(true);
      console.log("depositing on Morpho");
      const abiCoder = new ethers.AbiCoder();
      const morphoDepositData = abiCoder.encode(
        ["address", "address", "address", "address", "uint256"],
        [ORACLE, IRM, COLLATERAL_TOKEN, LOAN_TOKEN, LLTV]
      );
      const random32Bytes = ethers.hexlify(ethers.randomBytes(32));
      const pocketVaultString = Cookies.get("argsStringify");
      const poketVaultParsed = JSON.parse(pocketVaultString ?? "{}");
      const { pocketManager, pocketVault, referenceSafe } = poketVaultParsed;
      const a = await client?.call({
        to: pocketManager,
        data: encodeFunctionData({
          abi: PocketManagerABI.abi,
          functionName: "referenceSafe",
          args: [],
        }),
      });
      console.log("a is ...", a);
      const b = await client?.call({
        to: pocketManager,
        data: encodeFunctionData({
          abi: PocketManagerABI.abi,
          functionName: "pocketVault",
          args: [],
        }),
      });
      console.log("b is ...", b);
      const result = await client?.call({
        to: pocketVault,
        data: encodeFunctionData({
          abi: PocketVaultABI,
          functionName: "nonce",
          args: [],
        }),
      });
      console.log("result is ...", result);

      const encodedCreateDeterministicCall = encodeFunctionData({
        abi: BasePocketFactoryABI.abi,
        functionName: "createDeterministic",
        args: [MorphoPocket, random32Bytes, morphoDepositData],
      });

      if (!result) return;
      console.log("result data is ...", result.data);
      const signedData = await signTypedDataAsync({
        domain: {
          chainId: chainId,
          verifyingContract: referenceSafe,
        },
        types: {
          SafeTx: [
            { type: "address", name: "to" },
            { type: "uint256", name: "value" },
            { type: "bytes", name: "data" },
            { type: "uint8", name: "operation" },
            { type: "uint256", name: "safeTxGas" },
            { type: "uint256", name: "baseGas" },
            { type: "uint256", name: "gasPrice" },
            { type: "address", name: "gasToken" },
            { type: "address", name: "refundReceiver" },
            { type: "uint256", name: "nonce" },
          ],
        },
        primaryType: "SafeTx",
        message: {
          to: BasePocketFactory,
          value: 0n,
          data: encodedCreateDeterministicCall as `0x${string}`,
          operation: 1,
          safeTxGas: 0n,
          baseGas: 0n,
          gasPrice: 0n,
          gasToken: ethers.ZeroAddress as `0x${string}`,
          refundReceiver: ethers.ZeroAddress as `0x${string}`,
          nonce: BigInt(result.data ?? 0),
        },
      });

      writeContract(
        {
          address: pocketManager as `0x${string}`,
          abi: PocketManagerABI.abi,
          functionName: "executeTransaction",
          args: [
            BasePocketFactory,
            0,
            1,
            encodedCreateDeterministicCall,
            signedData,
          ],
          gas: 5000000n,
        },
        {
          onSuccess: (result) => {
            console.log("Transaction successful:", result);
            Cookies.set("morphoBalance", morphoAmount);
            setLoading(false);
            setActivated(true);
          },
          onError: (error) => {
            console.error("Transaction error:", error);
          },
        }
      );
    } catch (error) {
      console.log("error is ...", error);
    }
  };
  switch (type) {
    case PocketType.UNISWAP:
      return (
        <div className="mx-auto max-w-md space-y-2 rounded-lg border bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-700">
            Uniswap Activation
          </h1>
          <p className="text-gray-600">
            Activate your Uniswap pocket to start swapping tokens seamlessly.
          </p>
          <div className="flex justify-end">
            <button
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Loading" : "Yes, Activate"}
            </button>
          </div>
        </div>
      );
    case PocketType.MORPHO:
      return !activated ? (
        <div className="mx-auto max-w-md space-y-2 rounded-lg border bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-700">Morpho Deposit</h1>
          <p className="text-gray-600">
            Deposit wETH on Morpho to start earning.
          </p>
          <input
            type="text"
            placeholder="Enter amount ..."
            value={morphoAmount}
            onChange={(e) => setMorphoAmount(e.target.value)}
            className="mt-4 w-full max-w-md rounded-md border-2 border-blue-500 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            style={{ borderColor: "#4F46E5", borderWidth: "2px" }}
          />
          <div className="flex justify-end">
            <button
              onClick={depositMorpho}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Loading" : "Yes, Deposit"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-md space-y-2 rounded-lg border bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-700">Morpho Deposit</h1>
          <p className="text-gray-600">
            Great, you completed your deposit.
          </p>
        </div>
      );
    case PocketType.PANCAKESWAP:
      return (
        <div className="mx-auto max-w-md space-y-2 rounded-lg border bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-700">
            PancakeSwap Activation
          </h1>
          <p className="text-gray-600">
            Get started with PancakeSwap for trading, farming, and staking.
          </p>
          <div className="flex justify-end">
            <button className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600">
              Activate
            </button>
          </div>
        </div>
      );
    default:
      return (
        <div className="mx-auto max-w-md space-y-2 rounded-lg border bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-700">
            Default Activation
          </h1>
          <p className="text-gray-600">
            This is a default modal body for any unspecified pocket type.
          </p>
          <div className="flex justify-end">
            <button className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
              Activate
            </button>
          </div>
        </div>
      );
  }
};

export default DepositModal;
