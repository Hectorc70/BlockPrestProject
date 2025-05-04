/* eslint-disable @typescript-eslint/no-explicit-any */
import loalABI from "@/assets/loalPoolABI.json"; // Importa el ABI
import web3 from "./web3helperCustom";


// Dirección del contrato en la blockchain
export const contractAddressLoalPool: string = "0x3C830CE46E13331d576Dd1DD1E7ec8B0c28BFbAB"; //nova

const getContract = async () => {
  const abiData = loalABI;
  const contract = new web3.eth.Contract(abiData, contractAddressLoalPool);
  return contract;
}

export default getContract