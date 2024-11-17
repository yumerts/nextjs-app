# Frontend for Yume RTS with NextJS

To run on local:
```
cd app
npm install
npm run dev
```

Make sure 

# Integrations:

Repo containing the frontend NextJS code, integrated with the backend server hosted in Phala TEE and smart contracts deployed on Arbitrum Sepolia.

## Backend Server (Phala TEE):
https://github.com/yumerts/yumerts-game-server
- Handling backend server logic, matchmaking, and communication and orchestration between smart contract and frontend

## Smart Contracts (Arbitrum Stylus):
- Match IC: 0x7b1f9446f72edae22ee2ba822575c27e8d47f04b
- Player IC: 0xcb79b2ba22c185512c0c023b54f34c20684b8ec9
- Prediction C: 0xad220b814c3fac1ee66bcd010a457ef1d45e5eaf

https://github.com/yumerts/prediction-contract
- Handles creating new prediction pools, allowing users to stake USDC, closing prediction pools, and handling prediction results and payouts
  
https://github.com/yumerts/match-information-contract
- Handle joining, creating, ending match, and opening a new prediction market when a new match is created

https://github.com/yumerts/player-info-contract
- Allows user to register using registerPlayer and stores information such as displayName, totalMatches, winningMatches, totalPredictions, winningPredictions, etc
