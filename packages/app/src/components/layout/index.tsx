import React, { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Cookies from "js-cookie";
import { usePublicClient, useWriteContract } from "wagmi";
import PocketFactoryAbi from "../../utils/abi/PocketFactory.json";
import { ethers } from "ethers";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import {
  useWatchPendingTransactions,
  useTransactionReceipt,
  useWaitForTransactionReceipt,
} from "wagmi";
import toast from "react-hot-toast";
import { PocketFactoryAddress } from "@/utils/contracts";
import { Hash, parseEventLogs } from "viem";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { writeContract, data } = useWriteContract();
  const client = usePublicClient();
  const { data: receiptData } = useTransactionReceipt();
  const [isLoaded, setIsLoaded] = useState(false);
  const [safeAddress, setSafeAddress] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loadingCreation, setLoadingCreation] = useState(false);
  const addRecentTransaction = useAddRecentTransaction();
  useWatchPendingTransactions({
    onTransactions(transactions) {
      console.log("New transactions!", transactions);
    },
  });
  useEffect(() => {
    const pocket = Cookies.get("pocketManager");
    if (pocket) {
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
    console.log("data onwrite is ", data);
    if (data) {
      getReceiptInfo(data);
    }
  }, [data]);
  const handleLoadSafe = () => {
    const isValid = ethers.isAddress(safeAddress);
    if (!isValid) {
      toast.error("Invalid Safe address");
      alert("Invalid Safe address");
      return;
    }
    setLoadingCreation(true);
    const random32Bytes = ethers.hexlify(ethers.randomBytes(32));
    writeContract(
      {
        address: PocketFactoryAddress as `0x${string}`,
        abi: PocketFactoryAbi.abi,
        functionName: "createDeterministic",
        args: [safeAddress, random32Bytes],
      },
      {
        onSuccess: (result) => {
          console.log("Transaction successful:", result);
          Cookies.set("pocketManager", safeAddress);
          addRecentTransaction({
            hash: result,
            description: "Create Pocket",
          });
          setIsLoaded(true);
          setLoadingCreation(false);
        },
        onError: (error) => {
          console.error("Transaction error:", error);
          setLoadingCreation(false);
        },
      }
    );
  };
  const getReceiptInfo = async (hash: Hash) => {
    console.log("hash is on getreceipt", hash);

    const receipt = await client?.getTransactionReceipt({ hash });
    console.log(receipt);

    const logs : any = parseEventLogs({
      abi: PocketFactoryAbi.abi,
      eventName: "PocketCreated",
      logs: receipt?.logs ?? [],
    });

    console.log(logs);
    if(logs[0] === undefined) return;
    
    const argsStringify = JSON.stringify(logs[0].args);
    console.log("argsStringify is ", argsStringify);
    Cookies.set("argsStringify", argsStringify);
  };
  const LoadYourSafe = () => {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to Gnosis Safe</h1>
        <p className="text-center text-lg text-muted-foreground">
          {"You don't have any pocket yet. Import your Safe to get started."}
        </p>
        <div className="flex w-full flex-col items-center  space-y-2">
          <input
            type="text"
            placeholder="Enter your Safe address"
            value={safeAddress}
            onChange={(e) => onChangeAddress(e.target.value)}
            className="mt-4 w-full max-w-md rounded-md border-2 border-blue-500 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            style={{ borderColor: "#4F46E5", borderWidth: "2px" }}
          />
          <button
            onClick={handleLoadSafe}
            className={
              !buttonEnabled
                ? "rounded-md border bg-gray-600 px-6 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                : "rounded-md border bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            }
            disabled={!buttonEnabled || loadingCreation}
          >
            {loadingCreation ? "Creating ..." : "Load Safe"}
          </button>
        </div>
      </div>
    );
  };
  const onChangeAddress = (address: string) => {
    console.log("entered onChangeAddress function");

    console.log("e is ", address);
    const isValid = ethers.isAddress(address);
    console.log("isValid is ", isValid);
    setButtonEnabled(isValid);
    setSafeAddress(address);
  };
  return (
    <>
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1 pt-16">
          {isLoaded ? children : <LoadYourSafe />}
        </main>
      </div>
    </>
  );
};
