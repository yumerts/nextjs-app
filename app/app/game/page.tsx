"use client";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

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

const GamePage = () => (
  <div className="flex h-screen">
    <div className="w-3/4 bg-gray-100 p-8">
      {/* This is where the other component will go */}
    </div>
    <div className="w-1/4 bg-white p-8 flex flex-col space-y-4 h-full">
      <LatestMessageList />
      <MessageList />
    </div>
  </div>
);

export default GamePage;