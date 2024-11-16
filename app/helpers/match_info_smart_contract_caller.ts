import { match_info_contract_abi } from "@/constants/contract_abi";
import { ConnectedWallet } from "@privy-io/react-auth";
import { encodeFunctionData } from "viem";
import { Signer } from "viem/_types/experimental/erc7715/types/signer";

export const execute_match_info_contract_function = async (wallet: ConnectedWallet, functionName: string, args: any[]) => {
    
    const provider = await wallet.getEthersProvider();
    const signer = provider.getSigner();
   
    const match_info_contract_address = process.env.NEXT_PUBLIC_MATCH_INFO_SMART_CONTRACT_ADDRESS;
    const match_info_function_data = encodeFunctionData({
        abi: match_info_contract_abi,
        functionName: functionName,
        args: args
    })
    const match_info_contract_execution_request = {
        to: match_info_contract_address,
        data: match_info_function_data
    }

    signer.sendTransaction(match_info_contract_execution_request)
}