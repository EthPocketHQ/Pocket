"use client";
import Link from "next/link";

import { type NavItem } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { buttonVariants } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/layout/subnav-accordion";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Image from "next/image";

interface SideNavProps {
  items: NavItem[];
  setOpen?: (open: boolean) => void;
  className?: string;
}

export function SideNav({ items, setOpen, className }: SideNavProps) {
  const path = usePathname();
  const { isOpen } = useSidebar();
  const [openItem, setOpenItem] = useState("");
  const [lastOpenItem, setLastOpenItem] = useState("");

  useEffect(() => {
    if (isOpen) {
      setOpenItem(lastOpenItem);
    } else {
      setLastOpenItem(openItem);
      setOpenItem("");
    }
  }, [isOpen]);

  return (
    <nav className="flex h-full flex-col justify-between">
      <div className="space-y-2">
        {items.map((item) =>
          item.isChidren ? (
            <Accordion
              type="single"
              collapsible
              className="space-y-2"
              key={item.title}
              value={openItem}
              onValueChange={setOpenItem}
            >
              <AccordionItem value={item.title} className="border-none ">
                <AccordionTrigger
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "group relative flex h-12 justify-between px-4 py-2 text-base duration-200 hover:bg-muted hover:no-underline"
                  )}
                >
                  <div>
                    <item.icon className={cn("h-5 w-5", item.color)} />
                  </div>
                  <div
                    className={cn(
                      "absolute left-12 text-base duration-200 ",
                      !isOpen && className
                    )}
                  >
                    {item.title}
                  </div>

                  {isOpen && (
                    <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  )}
                </AccordionTrigger>
                <AccordionContent className="mt-2 space-y-4 pb-1">
                  {item.children?.map((child) => (
                    <Link
                      key={child.title}
                      href={child.href}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "group relative flex h-12 justify-start gap-x-3",
                        path === child.href &&
                          "bg-muted font-bold hover:bg-muted"
                      )}
                    >
                      <child.icon className={cn("h-5 w-5", child.color)} />
                      <div
                        className={cn(
                          "absolute left-12 text-base duration-200",
                          !isOpen && className
                        )}
                      >
                        {child.title}
                      </div>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group relative flex h-12 justify-start",
                path === item.href && "bg-muted font-bold hover:bg-muted"
              )}
            >
              <item.icon className={cn("h-5 w-5", item.color)} />
              {/* <Image src={item.icon as string} width={25} height={25} alt="menu icon "/> */}
              <span
                className={cn(
                  "absolute left-12 text-base duration-200",
                  !isOpen && className
                )}
              >
                {item.title}
              </span>
            </Link>
          )
        )}
      </div>
      <div className="mt-auto flex justify-center">
        <Image
          src="/SidebarIcon.png"
          width={400}
          alt="nouns icon"
          height={200}
        />
      </div>
    </nav>
  );
}
