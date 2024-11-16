"use client";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import YumertsCanvas from "@/components/canvas";
import { useEffect, useRef, useState } from "react";



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

const MessageCard = ({ message }) => (
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

const GamePage = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const canvasRef = useRef<YumertsCanvas | null>(null);
  const [gameState, setGameState] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const newSocket = new WebSocket('ws://localhost:8080');
        setSocket(newSocket);

        newSocket.onopen = () => {
          console.log('Connected to the WebSocket server');
          setIsLoading(false);
        };

        newSocket.onmessage = (event) => {
          console.log('Message from server ', event.data);
          setGameState(event.data);
        };

        newSocket.onclose = () => {
          console.log('Disconnected from the WebSocket server');
          setError('Connection to game server lost. Please refresh the page.');
        };

        newSocket.onerror = (error) => {
          console.error('WebSocket error: ', error);
          setError('Failed to connect to game server. Please try again later.');
        };
      } catch (err) {
        setError('Failed to initialize game connection. Please refresh the page.');
        setIsLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleInputReceived = (input: { troopId: string; targetCoordinate: { x: number; y: number } }) => {
    if (!socket) return;
    try {
      socket.send(JSON.stringify(input));
    } catch (err) {
      setError('Failed to send command. Please try again.');
    }
  };
  
  return (
    <div className="flex h-screen">
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
  )
}
  


export default GamePage;