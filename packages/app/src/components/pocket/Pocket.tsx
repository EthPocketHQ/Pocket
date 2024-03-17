import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Modal from "../modal/Modal";
import { PocketType } from "@/pages";
import ActivateModal from "../modal/Activate";
import Cookies from "js-cookie";
import DepositModal from "../modal/Deposit";

type Props = {
  pocketType: PocketType;
  title: string;
  cookieKey: string;
  balanceKey: string;
};

const PocketComponent = ({
  pocketType,
  title,
  cookieKey,
  balanceKey,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [isDepositOpen, setDepositOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);
  const [isExecuteOpen, setExecuteOpen] = useState(false);
  const [isActivateOpen, setActivateOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    setIsActive(!!Cookies.get(cookieKey));
    const balanceCookie = Cookies.get(balanceKey);
    setBalance(balanceCookie ? Number(balanceCookie) : 0);
  }, [
    cookieKey,
    pocketType,
    balanceKey,
    Cookies.get(cookieKey),
    Cookies.get(balanceKey),
  ]);

  const texts = useMemo(() => {
    switch (pocketType) {
      case PocketType.UNISWAP:
        return {
          deposit: "Place",
          withdraw: "Withdraw",
          execute: "Kill",
          activate: "Activate",
        };
      case PocketType.MORPHO:
        return {
          deposit: "Lend WETH",
          withdraw: "Withdraw WETH",
          execute: "",
          activate: "Activate",
        };
      case PocketType.PANCAKESWAP:
        return {
          deposit: "Place",
          withdraw: "Withdraw",
          execute: "Kill",
          activate: "Activate",
        };
    }
  }, [pocketType]);

  return (
    <Card className="h-40">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{`${title} Pocket`}</CardTitle>
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
        <div className="text-2xl font-bold">{`${balance}`}</div>
        <p className="text-xs text-muted-foreground">+13.1% from last month</p>
        {/* Botones añadidos aquí */}
        {isActive ? (
          <div className="mt-2 flex w-full max-w-sm justify-center space-x-2">
            {texts.deposit && (
              <button
                className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-sm text-white"
                onClick={() => setDepositOpen(true)}
              >
                {texts.deposit}
              </button>
            )}
            {texts.withdraw && (
              <button
                className="flex-1 rounded-md bg-green-500 px-4 py-2 text-sm text-white"
                onClick={() => setWithdrawOpen(true)}
              >
                {texts.withdraw}
              </button>
            )}
            {texts.execute && (
              <button
                className="flex-1 rounded-md bg-teal-500 px-4 py-2 text-sm text-white"
                onClick={() => setExecuteOpen(true)}
              >
                {texts.execute}
              </button>
            )}
          </div>
        ) : (
          <div className="mt-2 flex w-full justify-center">
            <button
              onClick={() => setActivateOpen(true)}
              className="text-m rounded-md bg-green-500 px-4 py-2 text-white"
            >
              Activate
            </button>
          </div>
        )}
        <Modal
          isOpen={isDepositOpen}
          closeModal={() => setDepositOpen(false)}
          title="Deposit"
        >
          <DepositModal type={pocketType} />
        </Modal>
        <Modal
          isOpen={isWithdrawOpen}
          closeModal={() => setWithdrawOpen(false)}
          title="Withdraw"
        >
          <div>test</div>
        </Modal>
        <Modal
          isOpen={isExecuteOpen}
          closeModal={() => setExecuteOpen(false)}
          title="Execute"
        >
          <DepositModal type={pocketType} />
        </Modal>
        <Modal
          isOpen={isActivateOpen}
          closeModal={() => setActivateOpen(false)}
          title="Activate Pocket"
        >
          <ActivateModal type={pocketType} />
        </Modal>
      </CardContent>
    </Card>
  );
};

export default PocketComponent;
