import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const PocketComponent = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <Card className="h-40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pocket 1</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$1,000.89</div>
        <p className="text-xs text-muted-foreground">+13.1% from last month</p>
        {/* Botones añadidos aquí */}
        {isActive ? (
          <div className="center mt-2 flex space-x-2">
            <button className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white">
              Deposit
            </button>
            <button className="rounded-md bg-green-500 px-4 py-2 text-sm text-white">
              Withdraw
            </button>
            <button className="rounded-md bg-teal-500 px-4 py-2 text-sm text-white">
              Execute
            </button>
          </div>
        ) : (
          <div className="flex justify-center w-full mt-2">
            <button className="text-m rounded-md bg-green-500 px-4 py-2 text-white">
              Activate
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PocketComponent;
