import React, { useEffect, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { Token } from "@/models/Token";
import toast from "react-hot-toast";
import { BalanceList } from "@/components/balances/balance-list";

const MyProfile = () => {
  const [tokensList, setTokensList] = useState<Token[] | null>(null);
  useEffect(() => {
    readTokenBalances();
  }, []);
  const readTokenBalances = async () => {
    try {
      const response = await FetchSafeData('0xa953dEaDE87de58c5D539bF4104d233166C17827');
      console.log('response tokens is', response);
      setTokensList(response);
    } catch (error) {
      console.log('error fetching tokens', error);
      toast.error('Error fetching tokens');
    }
  }
  const FetchSafeData = async (safeAddress: string) => {
    const response = await fetch(`/api/proxy?safeAddress=${safeAddress}`);
    const data = await response.json() as Token[];
    return data;
  };
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>My Token Balances</CardTitle>
                  {tokensList && <CardDescription>
                    {`You have balances in ${tokensList.length} tokens.`}
                  </CardDescription>}
                </CardHeader>
                <CardContent>
                  {tokensList && <BalanceList 
                    tokensList={tokensList}
                  />}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyProfile;
