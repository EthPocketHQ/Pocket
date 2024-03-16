
import { cn } from "@/lib/utils";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import Link from "next/link";
import { Boxes } from "lucide-react";
import { UserNav } from "@/components/layout/user-nav";
import { useSession } from "next-auth/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Header() {
    const { setTheme } = useTheme();

    const { data: sessionData } = useSession();
    useEffect(() => {
      setTheme('light');
    }, [])
    
    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <Link
                    href={"/"}
                    className="hidden items-center justify-center gap-2 md:flex ml-4"
                >
                    <Image src="/Pocket.png" alt="Pocket dApp" width={120} height={30} />
                </Link>
                <div className={cn("block md:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    {/* <ThemeToggle /> */}
                    {sessionData?.user ? (
                        <UserNav user={sessionData.user} />
                    ) : (
                        <ConnectButton />
                    )}
                </div>
            </nav>
        </div>
    );
}