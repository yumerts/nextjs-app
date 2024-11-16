"use client"
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useContext } from "react";
import { pay_usdc_to_prediction_contract } from "@/helpers/payusdc";
import { useRouter } from "next/navigation";

export const Navbar = () => {

  const {ready, authenticated, login, logout, sendTransaction} = usePrivy();
  const {ready: walletsReady, wallets} = useWallets();
  const router = useRouter();
  let currentWallet = 0;

  const goToProfile = () => {
    router.push('/profile')
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">YumeRTS Experiment</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          {ready ?
            (authenticated && walletsReady ?
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      className="text-sm font-normal text-default-600 bg-default-100"
                      variant="flat"
                    >
                      {
                        wallets.length > 0? 
                        wallets[currentWallet].address.slice(0, 6) + "..." + wallets[currentWallet].address.slice(-4)
                        : "Wallet"
                      }
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {/* <>
                      {wallets.map((wallet, index) => (
                        <DropdownItem key={index} onClick={()=>{currentWallet=index}}>
                          {(wallet.walletClientType === "privy")?"(Managed) ":"(External) " + wallet.address.slice(0, 6) + "..." + wallet.address.slice(-4)}
                        </DropdownItem>
                      ))}
                    </> */}
                    {/* <DropdownItem key="pay" className="text-primary" color="success" onClick={payUSDC(wallets, 100)}>
                      Send USDC to Contract
                    </DropdownItem> */}
                    <DropdownItem key="profile" onClick={goToProfile}>
                      Profile
                    </DropdownItem>
                    <DropdownItem key="delete" className="text-danger" color="danger" onClick={logout}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              :
              <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                variant="flat"
                onClick={login}
              >
                Login
              </Button>)
            :
            null //not ready
          }

        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
