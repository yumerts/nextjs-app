"use client";

import { Card, CardBody, CardHeader, User } from "@nextui-org/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { createPublicClient, encodeFunctionData, erc20Abi, http } from "viem";
import { arbitrumSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

// Sample user data
const userData = {
  username: "GamerPro123",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
  gamesWon: 42,
  gamesLost: 18,
  stats: [
    { stat: "Attack", value: 80 },
    { stat: "Defense", value: 65 },
    { stat: "Speed", value: 90 },
    { stat: "Strategy", value: 75 },
    { stat: "Teamwork", value: 85 },
  ],
};

export default async function ProfilePage() {
  const { ready, authenticated, login, logout, sendTransaction } = usePrivy();
  const { ready: walletsReady, wallets } = useWallets();
  const router = useRouter();
  let current_wallet = wallets[0];
  current_wallet.switchChain(421614);
  const provider = await current_wallet.getEthersProvider();
  const signer = provider.getSigner();

  const PLAYER_INFO_CONTRACT_ADDRESS =
    "0xb0e5edd9d771d59e9efdd5b6e36e76942ed9fd7d";
  const PLAYER_INFO_CONTRACT_ABI = [
    {
      inputs: [
        { internalType: "address", name: "winner_address", type: "address" },
        { internalType: "address", name: "loser_address", type: "address" },
      ],
      name: "addMatchResults",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "player_address", type: "address" },
        { internalType: "bool", name: "was_won", type: "bool" },
      ],
      name: "addPredictionResults",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getDisplayName",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "player_address", type: "address" },
      ],
      name: "getDisplayNameByAddress",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getMatchmakingContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getPredictionContract",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalMatches",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "player_address", type: "address" },
      ],
      name: "getTotalMatchesByAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalPredictions",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "player_address", type: "address" },
      ],
      name: "getTotalPredictionsByAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getWinningMatches",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "player_address", type: "address" },
      ],
      name: "getWinningMatchesByAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getWinningPredictions",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "player_address", type: "address" },
      ],
      name: "getWinningPredictionsByAddress",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "init",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "registerPlayer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "matchmaking_contract",
          type: "address",
        },
      ],
      name: "setMatchmakingContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "prediction_contract",
          type: "address",
        },
      ],
      name: "setPredictionContract",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "string", name: "display_name", type: "string" },
      ],
      name: "updateDisplayName",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const player_display_name = await publicClient.readContract({
    address: PLAYER_INFO_CONTRACT_ADDRESS,
    abi: PLAYER_INFO_CONTRACT_ABI,
    functionName: "getDisplayNameByAddress",
    args: [wallets[0].address],
  });

  userData.username = player_display_name;

  return (
    <div>
      <Card className="max-w-[800px] mx-auto">
        <CardHeader className="flex gap-3">
          <User
            name={userData.username}
            avatarProps={{
              src: userData.avatar,
            }}
          />
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>Profile Summary</p>
              <p>
                <span className="font-semibold">Games Won:</span>{" "}
                {userData.gamesWon}
              </p>
              <p>
                <span className="font-semibold">Games Lost:</span>{" "}
                {userData.gamesLost}
              </p>
              <p>
                <span className="font-semibold">Win Rate:</span>{" "}
                {(
                  (userData.gamesWon /
                    (userData.gamesWon + userData.gamesLost)) *
                  100
                ).toFixed(2)}
                %
              </p>
            </div>
            <div>
              <p>Player Stats</p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={userData.stats}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Stats"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
