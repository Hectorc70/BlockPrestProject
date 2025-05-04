/* eslint-disable @typescript-eslint/no-explicit-any */
import loalABI from "@/assets/loalPoolABI.json"; // Importa el ABI
import web3 from "./web3helperCustom";


// Dirección del contrato en la blockchain
export const contractAddressLoalPool: string = "0xd56bb9025eAa8870c7BD238574bD5186E3e6272B"; //nova

const getContract = async () => {
  const abiData = loalABI;
  const contract = new web3.eth.Contract(abiData, contractAddressLoalPool);
  return contract;
}

export default getContract