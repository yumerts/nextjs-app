export async function GET()
{ 

  const response = await fetch(`${process.env.NEXT_PUBLIC_GAME_SERVER_HOST}/api/v1/matches`,           {
    method: 'POST',
    headers: {
      'cache': 'no-store'
    }
  });
  const data = await response.json();
  const formattedMatches = {
    pending: data.filter((match) => match.match_status === 0).map((match) => ({
      id: match.match_id,
      playerA: match.player1_public_address,
      playerB: 'TBD',
      result: 'Pending'
    })),
    startingSoon: data.filter((match) => match.match_status === 2).map((match) => ({
      id: match.match_id,
      playerA: match.player1_public_address,
      playerB: match.player2_public_address,
      startTime: 'Soon'
    })),
    ongoing: data.filter((match) => match.match_status === 3).map((match) => ({
      id: match.match_id,
      playerA: match.player1_public_address,
      playerB: match.player2_public_address,
      duration: 'Ongoing'
    }))
  }

  return new Response(JSON.stringify(formattedMatches), 
    {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    {
    status: 200,
  });
}

