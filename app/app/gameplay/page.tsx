"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import YumertsCanvas from "@/components/canvas";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { User, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from "@nextui-org/react";
import { useGameWebsocket } from "@/providers/game_websocket_provider";

const messages = [
  { 
    id: 1,
    timestamp: '2023-04-15T12:34:56',
    sender: 'John Doe',
    content: 'This is the latest message.'
  },
  {
    id: 2, 
    timestamp: '2023-04-14T10:20:30',
    sender: 'Jane Smith',
    content: 'Here is a previous message.'
  },
  {
    id: 3,
    timestamp: '2023-04-13T08:15:00', 
    sender: 'Bob Johnson',
    content: 'This is an older message.'
  },
  {
    id: 4,
    timestamp: '2023-04-12T16:45:00',
    sender: 'Alice Williams',
    content: 'Here is another older message.'
  },
  {
    id: 5,
    timestamp: '2023-04-11T14:30:00',
    sender: 'Tom Davis',
    content: 'This is the oldest message.'
  }
];

interface Message {
  id: number;
  timestamp: string;
  sender: string;
  content: string;
}

const MessageCard = ({ message }: { message: Message }) => (
  <Card className="mb-1">
    <CardBody className="text-sm">
      <p>{message.content}</p>
    </CardBody>
  </Card>
);

const MessageList = () => (
  <div className="bg-gray-100 p-4 rounded-lg overflow-y-auto h-[300px]">
    {messages.map(message => (
      <MessageCard key={message.id} message={message} />
    ))}
  </div>
);

const LatestMessageList = () => (
  <div className="bg-gray-100 p-4 rounded-lg overflow-y-auto h-[300px]">
    {messages.slice(0, 3).map(message => (
      <MessageCard key={message.id} message={message} />
    ))}
  </div>
);

export default function GamePage() {
  const {gameWebsocket, send_inputs} = useGameWebsocket();
  const [isSearching, setIsSearching] = useState(true);
  const [opponent, setOpponent] = useState(null);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<typeof YumertsCanvas | null>(null);

  const params = useParams();
  const match_id = params.slug;
  console.log(match_id);

  const handleInputReceived = (input: { troopId: string; targetCoordinate: { x: number; y: number } }) => {
    if (!gameWebsocket) return;
    try {
        send_inputs(input);
    } catch (err) {
      setError('Failed to send command. Please try again.');
    }
  };

  const handleAccept = () => {
    setHasAccepted(true);
    setOpponent(null);
    // Here you would typically start the game or perform any other necessary actions
  };

  return (
    <>
      <div className={`flex h-screen`}>
        <div className="w-3/4 bg-gray-100 p-8">
          <div className="App">
            <YumertsCanvas inputReceived={handleInputReceived} />
          </div>
        </div>
        <div className="w-1/4 bg-white p-8 flex flex-col space-y-4 h-full">
          <LatestMessageList />
          <MessageList />
        </div>
      </div>
    </>
  );
}