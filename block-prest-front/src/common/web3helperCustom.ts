/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from "web3";
let web3: Web3;


if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  try {
    window.ethereum.request({ method: "eth_requestAccounts" });
  } catch (e:any) {
    console.error(e);
    console.error("Acceso denegado a la cuenta del usuario");
  }
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.log("No se encontró un proveedor de Web3. Instala MetaMask.");
  web3 = new Web3(); // Web3 vacío en caso de que no haya proveedor
}

export default web3;