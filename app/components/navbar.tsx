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
import {encodeFunctionData, erc20Abi} from 'viem';

export const Navbar = () => {

  const {ready, authenticated, login, logout, sendTransaction} = usePrivy();
  const {ready: walletsReady, wallets} = useWallets();
  let currentWallet = 0;
  
  const payUSDC = async () => {

    let current_wallet = wallets[0];
    current_wallet.switchChain(421614);
    const provider = await current_wallet.getEthersProvider();
    const signer = provider.getSigner();

    const USDC_TOKEN_ADDRESS = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
    const CONTRACT_TOKEN_ADDRESS = "0xefb612f067c166f77974f5bb0b04616730c0b483"
    const amountToDeposit = 100;

    const USDC_TOKEN_APPROVE_ABI = erc20Abi;
    const DEPOSIT_ABI = [{"inputs":[{"internalType":"uint64","name":"amount","type":"uint64"}],"name":"depositUsdc","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getUsdcBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"init","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"setMyAddress","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferUsdcToOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"viewMyAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

    const USDC_FUNCTION_DATA = encodeFunctionData({
      abi: USDC_TOKEN_APPROVE_ABI, 
      functionName: "approve",
      args: [CONTRACT_TOKEN_ADDRESS, BigInt(amountToDeposit)]
    });
    const USDC_APPROVAL_REQUEST = {
      to: USDC_TOKEN_ADDRESS,
      data: USDC_FUNCTION_DATA
    }

    signer.sendTransaction(USDC_APPROVAL_REQUEST);

    const DEPOSIT_FUNCTION_DATA = encodeFunctionData({
      abi: DEPOSIT_ABI,
      functionName: "depositUsdc",
      args: [BigInt(amountToDeposit)]
    })

    const DEPOSIT_REQUEST = {
      to: CONTRACT_TOKEN_ADDRESS,
      data: DEPOSIT_FUNCTION_DATA
    }

    signer.sendTransaction(DEPOSIT_REQUEST);
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
                    <>
                      {wallets.map((wallet, index) => (
                        <DropdownItem key={index} onClick={()=>{currentWallet=index}}>
                          {(wallet.walletClientType === "privy")?"(Managed) ":"(External) " + wallet.address.slice(0, 6) + "..." + wallet.address.slice(-4)}
                        </DropdownItem>
                      ))}
                    </>
                    <DropdownItem key="pay" className="text-primary" color="success" onClick={payUSDC}>
                      Send USDC to Contract
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
