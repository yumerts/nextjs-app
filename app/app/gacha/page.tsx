"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@nextui-org/button"
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card"
import { Gift, Sparkles } from 'lucide-react'

// Define the item type
type Item = {
  id: number
  name: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

// Define the pool of items
const itemPool: Item[] = [
  { id: 1, name: "Wooden Sword", rarity: "common" },
  { id: 2, name: "Iron Shield", rarity: "common" },
  { id: 3, name: "Health Potion", rarity: "common" },
  { id: 4, name: "Magic Wand", rarity: "rare" },
  { id: 5, name: "Dragon Scale Armor", rarity: "rare" },
  { id: 6, name: "Enchanted Bow", rarity: "epic" },
  { id: 7, name: "Phoenix Feather", rarity: "epic" },
  { id: 8, name: "Excalibur", rarity: "legendary" },
]

// Gacha logic: Select a random item based on rarity
const getRandomItem = (): Item => {
  const rand = Math.random()
  let rarity: "common" | "rare" | "epic" | "legendary"
  
  if (rand < 0.6) rarity = "common"
  else if (rand < 0.85) rarity = "rare"
  else if (rand < 0.97) rarity = "epic"
  else rarity = "legendary"
  
  const possibleItems = itemPool.filter(item => item.rarity === rarity)
  return possibleItems[Math.floor(Math.random() * possibleItems.length)]
}

export default function GachaGame() {
  const [items, setItems] = useState<Item[]>([])
  const [isRolling, setIsRolling] = useState(false)

  const handleRoll = () => {
    setIsRolling(true)
    setTimeout(() => {
      const newItem = getRandomItem()
      setItems(prevItems => [...prevItems, newItem])
      setIsRolling(false)
    }, 1000) // Simulate rolling time
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-600 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-none text-white">
        <CardHeader>
          <CardHeader className="text-2xl font-bold text-center">Gacha Game</CardHeader>
        </CardHeader>
        <CardBody className="flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer"
          >
            {isRolling && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Sparkles className="text-yellow-300 w-12 h-12 animate-spin" />
              </motion.div>
            )}
          </motion.div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRoll} disabled={isRolling} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            <Gift className="mr-2 h-4 w-4" /> Roll Gacha
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`
                ${item.rarity === "common" ? "bg-gray-200" : ""}
                ${item.rarity === "rare" ? "bg-blue-200" : ""}
                ${item.rarity === "epic" ? "bg-purple-200" : ""}
                ${item.rarity === "legendary" ? "bg-yellow-200" : ""}
              `}>
                <CardHeader>
                  <CardBody className="text-lg">{item.name}</CardBody>
                  <CardBody className="capitalize">{item.rarity}</CardBody>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}