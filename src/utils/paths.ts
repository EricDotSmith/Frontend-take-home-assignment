import {
  CurrencyDollarIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

interface SidebarNavigation {
  name: string;
  href: string;
  icon: any;
}

export const sidebarNavigation: SidebarNavigation[] = [
  {
    name: "Bitcoin Price Index",
    href: "/",
    icon: CurrencyDollarIcon,
  },
  {
    name: "NFT List",
    href: "/nfts",
    icon: ListBulletIcon,
  },
];
