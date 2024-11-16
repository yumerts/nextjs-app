'use client'

import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, Button, Card, CardBody, CardFooter, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { LogOut, Eye, Play, FastForward, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { payUSDC } from "@/helpers/payusdc";

// Sample data for matches
const sampleMatches = {
  startingSoon: [
    { id: 1, playerA: "Alice", playerB: "Bob", startTime: "10:00 AM" },
    { id: 2, playerA: "Charlie", playerB: "David", startTime: "10:30 AM" },
  ],
  ongoing: [
    { id: 3, playerA: "Eve", playerB: "Frank", duration: "15:20" },
    { id: 4, playerA: "Grace", playerB: "Henry", duration: "08:45" },
  ],
  pending: [
    { id: 5, playerA: "Ivy", playerB: "...", result: "" },
    { id: 6, playerA: "Kate", playerB: "...", result: "" },
  ]
}

export default function MatchMakingLobbies() {
  const [matches, setMatches] = useState(sampleMatches)
  const [showModal1, setShowModal1] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<{ playerA: string; playerB: string } | null>(null)
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null)
  const [betAmount, setBetAmount] = useState<string>('')
  const router = useRouter();

  const {ready, authenticated, login, logout, sendTransaction} = usePrivy();
  const {ready: walletsReady, wallets} = useWallets();

  const handleCreateMatch = async () => {
    console.log("Creating a new match")
    // Pay USDC
    // const amountToDeposit = 1;
    // const payment_hash = await payUSDC(wallets, amountToDeposit);
    // // Send create match request to game server
    // try {
    //   const response = await fetch('/api/create_match',{
    //     method: 'POST',
    //     body: JSON.stringify({'payment_hash': '123'}),
    //     headers: {
    //       'content-type': 'application/json'
    //     }
    //   })
    
    //   const data = await response.json();
    //   console.log(data.signature);
    //   console.log(data.match_id);
    //   if (response.status == 200) {
    //     router.push('/game')
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  }

  const handleJoinMatch = async (matchId: number) => {
    console.log("Joining match:", matchId)
    // Handle join match logic
    // const amountToDeposit = 1;
    // const payment_hash = await payUSDC(wallets, amountToDeposit);
    // try {
    //   const response = await fetch('/api/join_match',{
    //     method: 'POST',
    //     body: JSON.stringify({
    //       'match_id': matchId, 
    //       'payment_hash': '123'}),
    //     headers: {
    //       'content-type': 'application/json'
    //     }
    //   })
    //   const data = await response.json();
    //   console.log(data.signature);
    //   console.log(data.match_id);
    //   if (response.status == 200) {
    //     router.push('/game')
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  }

  const handlePredict = (match: { playerA: string; playerB: string }) => {
    setSelectedMatch(match)
    setShowModal1(true)
  }

  const handlePlayerSelect = (player: string) => {
    setSelectedPlayer(player)
  }

  const handleBetAmountChange = (value: string) => {
    setBetAmount(value)
  }

  const handleConfirmBet = async () => {
    if (selectedPlayer && betAmount) {
      console.log(`Bet confirmed: ${betAmount} on ${selectedPlayer}`)
      // const amountToDeposit = betAmount;
      // const payment_hash = await payUSDC(wallets, amountToDeposit);
      // Add your bet confirmation logic here
      setShowModal1(false)
      setSelectedPlayer(null)
      setBetAmount('')
      setSelectedMatch(null)
    }
  }

  const handleSpectate = (matchId: number) => {
    console.log(`Spectating match ${matchId}`)
    // Add your spectate logic here
  }

  const handleReplay = (matchId: number) => {
    console.log(`Replaying match ${matchId}`)
    // Add your replay logic here
  }

  return (
    <div className="min-h-screen bg-100">

      <div className="p-4">
        <Button color="primary" className="mb-6" onClick={handleCreateMatch}>
          <Plus className="mr-2 h-4 w-4" />
          Create Match
        </Button>

        <div className="grid gap-6 md:grid-cols-3">
        <div>
            <h2 className="text-xl font-semibold mb-4">Join A Game</h2>
            {matches.pending.map((match) => (
              <Card key={match.id} className="mb-4">
                <CardBody>
                  <p className="text-lg font-semibold">{match.playerA} vs {match.playerB}</p>
                  <p className="text-sm text-gray-500">Result: {match.result}</p>
                </CardBody>
                <CardFooter>
                  <Button color="success" onClick={() => handleJoinMatch(match.id)}>
                    <Play className="mr-2 h-4 w-4" />
                    Join Game
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Starting Soon</h2>
            {matches.startingSoon.map((match) => (
              <Card key={match.id} className="mb-4">
                <CardBody>
                  <p className="text-lg font-semibold">{match.playerA} vs {match.playerB}</p>
                  <p className="text-sm text-gray-500">Starts at: {match.startTime}</p>
                </CardBody>
                <CardFooter>
                  <Button color="primary" onClick={() => handlePredict(match)}>
                    <FastForward className="mr-2 h-4 w-4" />
                    Predict
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Matchmaking Ongoing</h2>
            {matches.ongoing.map((match) => (
              <Card key={match.id} className="mb-4">
                <CardBody>
                  <p className="text-lg font-semibold">{match.playerA} vs {match.playerB}</p>
                  <p className="text-sm text-gray-500">Duration: {match.duration}</p>
                </CardBody>
                <CardFooter>
                  <Button color="secondary" onClick={() => handleSpectate(match.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Spectate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Predict the Winner</ModalHeader>
              <ModalBody>
                <div className="flex gap-4 justify-center">
                  <Button
                    color={selectedPlayer === selectedMatch?.playerA ? "primary" : "default"}
                    onClick={() => handlePlayerSelect(selectedMatch?.playerA || '')}
                  >
                    {selectedMatch?.playerA}
                  </Button>
                  <Button
                    color={selectedPlayer === selectedMatch?.playerB ? "primary" : "default"}
                    onClick={() => handlePlayerSelect(selectedMatch?.playerB || '')}
                  >
                    {selectedMatch?.playerB}
                  </Button>
                </div>
                <Input
                  label="Bet Amount"
                  placeholder="Enter bet amount"
                  type="number"
                  value={betAmount}
                  onChange={(e) => handleBetAmountChange(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleConfirmBet} isDisabled={!selectedPlayer || !betAmount}>
                  Confirm Bet
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  )
}