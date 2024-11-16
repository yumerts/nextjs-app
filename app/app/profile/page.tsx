"use client"

import { Card, CardBody, CardHeader, User } from "@nextui-org/react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

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
  ]
}

export default function ProfilePage() {
  return (
    <div>
      <Card className="max-w-[800px] mx-auto">
        <CardHeader className="flex gap-3">
          <User
            name={userData.username}
            avatarProps={{
              src: userData.avatar
            }}
          />
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>Profile Summary</p>
              <p>
                <span className="font-semibold">Games Won:</span> {userData.gamesWon}
              </p>
              <p>
                <span className="font-semibold">Games Lost:</span> {userData.gamesLost}
              </p>
              <p>
                <span className="font-semibold">Win Rate:</span> {((userData.gamesWon / (userData.gamesWon + userData.gamesLost)) * 100).toFixed(2)}%
              </p>
            </div>
            <div>
              <p>Player Stats</p>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={userData.stats}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="stat" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Stats" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}