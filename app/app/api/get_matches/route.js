export async function GET()
{
  // const matches = Post to game server and get response
  // Sample matches
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

  return new Response(JSON.stringify(sampleMatches
   ), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
}

