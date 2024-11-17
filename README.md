# Frontend for Yume RTS with NextJS

# Integrations:

Repo containing the frontend NextJS code, integrated with the backend server hosted in Phala TEE and smart contracts deployed on Arbitrum Sepolia.

## Backend Server:
https://github.com/yumerts/yumerts-game-server
- Handling backend server logic, matchmaking, and communication and orchestration between smart contract and frontend

## Smart Contracts:
https://github.com/yumerts/prediction-contract
- Handles creating new prediction pools, allowing users to stake USDC, closing prediction pools, and handling prediction results and payouts
  
https://github.com/yumerts/match-information-contract
- Handle joining, creating, ending match, and opening a new prediction market when a new match is created

https://github.com/yumerts/player-info-contract
- Allows user to register using registerPlayer and stores information such as displayName, totalMatches, winningMatches, totalPredictions, winningPredictions, etc
