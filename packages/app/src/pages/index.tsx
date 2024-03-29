"use client";
import React, { useEffect, useState } from "react";

import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { CalendarDateRangePicker } from "@/components/dashboard/date-range-picker";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";
import PocketComponent from "@/components/pocket/Pocket";
export enum PocketType {
  SWAP = "swap",
  UNISWAP = "uniswap",
  MORPHO = "morpho",
  PANCAKESWAP = "pancakeswap",
}
const Home = () => {
  const [allPocketsBalance, setAllPocketsBalance] = useState("0");

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">My Pockets</h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Gnosis Pay</CardTitle>
                  <CardDescription>Your main account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-l font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>All My Pockets</CardTitle>
                  <CardDescription>
                    All your pockets. 0x677C971acCD036415B6F76a80F21e6a8A064e210
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex">
                  <div>
                    <div className="text-l font-bold">{allPocketsBalance}</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from last month
                    </p>
                  </div>
                  <Button
                    className="ml-auto"
                    size="sm"
                    variant="outline"
                    onClick={() => setAllPocketsBalance("$3792.12")}
                  >
                    Refresh
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <PocketComponent
                pocketType={PocketType.UNISWAP}
                title="Uniswap Hook Limit Order"
                cookieKey="uniswapLimitOrderActivated"
                balanceKey="uniswapBalance"
              />
              <PocketComponent
                pocketType={PocketType.MORPHO}
                title="Morpho WETH Lending"
                cookieKey="morphoActived"
                balanceKey="morphoBalance"
              />
              <PocketComponent
                pocketType={PocketType.PANCAKESWAP}
                title="Pancakeswap Hook Limit Order"
                cookieKey="pancakeswapLimitOrderActivated"
                balanceKey="pancakeSwapBalance"
              />
              <PocketComponent
                pocketType={PocketType.SWAP}
                title="Uniswap SDAI/EURe"
                cookieKey="pancakeswapLimitOrderActivated"
                balanceKey="pancakeSwapBalance"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              {/* <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Movements</CardTitle>
                  <CardDescription>
                    You made 265 movements this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSales />
                </CardContent>
              </Card> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
