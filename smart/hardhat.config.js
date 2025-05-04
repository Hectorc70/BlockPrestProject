require("dotenv").config();
require("@nomicfoundation/hardhat-ethers"); 

const { PRIVATE_KEY } = process.env;
// console.log(PRIVATE_KEY);
module.exports = {
  solidity: "0.8.28",
  networks: {
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: PRIVATE_KEY ? [`0x${PRIVATE_KEY}`] : [],
    },
  },
};