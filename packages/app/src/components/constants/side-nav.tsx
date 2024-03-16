import {
  BookOpenCheck,
  LayoutDashboard,
  DollarSign,
  Settings,
  User,
} from "lucide-react";
import { type NavItem } from "@/types";

export const NavItems: NavItem[] = [
  {
    title: "My Pockets",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
    isChidren: false,
    children: [
      {
        title: "Pocket 1",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/employees",
      },
      {
        title: "Pocket 2",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-02",
      },
      {
        title: "My Vault",
        icon: BookOpenCheck,
        color: "text-red-500",
        href: "/example/example-03",
      },
    ],
  },
  {
    title: "My Profile",
    icon: User,
    href: "/myProfile",
    color: "text-sky-500",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/",
    color: "text-sky-500",
  },
  {
    title: "Narco Wallet",
    icon: DollarSign,
    href: "/",
    color: "text-green-500",
  },
];
