import { type LucideIcon } from "lucide-react";

export interface NavItem {
    title: string;
    href: string;
    icon: string | LucideIcon;
    color?: string;
    isChidren?: boolean;
    children?: NavItem[];
}