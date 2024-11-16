import { ConnectedWallet } from '@privy-io/react-auth';
import {encodeFunctionData, erc20Abi} from 'viem';
import { prediction_contract_abi } from '@/constants/contract_abi';

export const pay_usdc_to_prediction_contract = async (wallet: ConnectedWallet, match_id: number, chosen_player: number, usdc_amount: number) => {

    let current_wallet = wallet;
    current_wallet.switchChain(421614);
    const provider = await current_wallet.getEthersProvider();
    const signer = provider.getSigner();
  
    const USDC_TOKEN_ADDRESS = "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d"
    const PREDICTION_SMART_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PREDICTION_SMART_CONTRACT_ADDRESS as `0x${string}` ?? "0x0000000000000000000000000000000000000000"
  
    const USDC_TOKEN_APPROVE_ABI = erc20Abi;
  
    const USDC_FUNCTION_DATA = encodeFunctionData({
      abi: USDC_TOKEN_APPROVE_ABI, 
      functionName: "approve",
      args: [`${PREDICTION_SMART_CONTRACT_ADDRESS}`, BigInt(usdc_amount)]
    });
    const USDC_APPROVAL_REQUEST = {
      to: USDC_TOKEN_ADDRESS,
      data: USDC_FUNCTION_DATA
    }
  
    await signer.sendTransaction(USDC_APPROVAL_REQUEST);
  
    const PREDICT_FUNCTION_DATA = encodeFunctionData({
      abi: prediction_contract_abi,
      functionName: "predictMatch",
      args: [match_id, chosen_player, BigInt(usdc_amount)]
    })
  
    const PREDICTION_REQUEST = {
      to: PREDICTION_SMART_CONTRACT_ADDRESS,
      data: PREDICT_FUNCTION_DATA
    }
  
    await signer.sendTransaction(PREDICTION_REQUEST);

    return;
  }