import React, { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Cookies from "js-cookie";
import { useWriteContract } from "wagmi";
import PocketFactoryAbi from "../../utils/abi/PocketFactory.json";
import { ethers } from "ethers";
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { writeContract, data } = useWriteContract();
  const [isLoaded, setIsLoaded] = useState(false);
  const [safeAddress, setSafeAddress] = useState("");
  const PocketFactoryAddress = "0x1234567890123456789012345678901234567890";
  useEffect(() => {
    const pocket = Cookies.get("pocket");
    if (pocket) {
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
    console.log("data onwrite is ", data);
  }, [data]);
  const handleLoadSafe = () => {
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
          setIsLoaded(true);
          [
            //manager
            //bold
          ];
        },
        onError: (error) => {
          console.error("Transaction error:", error);
        },
      }
    );
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
            onChange={(e) => setSafeAddress(e.target.value)}
            className="mt-4 w-full max-w-md rounded-md border-2 border-blue-500 px-4 py-2 text-gray-700 focus:border-blue-500 focus:ring-blue-500"
            style={{ borderColor: "#4F46E5", borderWidth: "2px" }} // Ejemplo para bordes más vistosos
          />
          <button
            onClick={handleLoadSafe}
            className="rounded-md border bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Load Safe
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <Header />
      <div className="flex h-screen border-collapse overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1 pt-16">
          {!isLoaded ? children : <LoadYourSafe />}
        </main>
      </div>
    </>
  );
};
