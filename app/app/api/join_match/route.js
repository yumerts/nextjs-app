export async function POST(req,res)
{
  // const response = Post to game server and get response
  // Temp response
  return new Response(JSON.stringify({ signature: 'abc', match_id: 'id123'
   }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }); 
}