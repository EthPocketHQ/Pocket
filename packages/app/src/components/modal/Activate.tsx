import { PocketType } from "@/pages";
import React, { useState } from "react";
import { useWriteContract } from "wagmi";

type Props = {
  type: PocketType;
};
const ActivateModal = ({ type }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { writeContract } = useWriteContract();
  const morphoActivateAddress = "todefine";
  const activateMorpho = () => {
    console.log("Activating Morpho");
    // writeContract(
    //   {
    //     address: morphoActivateAddress as `0x${string}`,
    //     abi: PocketFactoryAbi.abi,
    //     functionName: "createDeterministic",
    //     args: [safeAddress, random32Bytes],
    //   },
    //   {
    //     onSuccess: (result) => {
    //       console.log("Transaction successful:", result);
          
    //     },
    //     onError: (error) => {
    //       console.error("Transaction error:", error);
    //       setLoadingCreation(false);
    //     },
    //   }
    // );
    
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
            <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Yes, Activate
            </button>
          </div>
        </div>
      );
    case PocketType.MORPHO:
      return (
        <div className="mx-auto max-w-md space-y-2 rounded-lg border bg-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-gray-700">Morpho Activation</h1>
          <p className="text-gray-600">
            Enable Morpho to optimize your lending and borrowing rates.
          </p>
          <div className="flex justify-end">
            <button
              onClick={activateMorpho}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Activate
            </button>
          </div>
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

export default ActivateModal;
