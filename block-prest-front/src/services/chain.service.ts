/* eslint-disable @typescript-eslint/no-explicit-any */
import { IChain } from "@/models/chain.model";
import data from '@/assets/blockchains.json';





const getAll = async (): Promise<Map<string, IChain>> => {
  try {

    const items: Map<string, IChain> = new Map<string, IChain>();
    for (let index = 0; index < data.length; index++) {
      items.set(data[index].chainId, data[index]);
    }
    return items
  } catch (e: any) {
    throw Error(e)
  }
}


const ChainsService = {
  getAll,
}

export default ChainsService
