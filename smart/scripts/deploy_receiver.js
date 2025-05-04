const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const hyperlaneAdapterAddress = "0xddf4C3e791caCaFd26D7fb275549739B38ae6e75"; // Reemplaza con la dirección real

  const Wrapper = await hre.ethers.getContractFactory("MXNBWrapper");
  
  const wrapper = await Wrapper.deploy(
    hyperlaneAdapterAddress, //
    {}                      // Overrides opcionales
  );

  await wrapper.waitForDeployment();
  console.log("MXNBWrapper deployed to:", await wrapper.getAddress());
  
  // Verificación
  console.log("Hyperlane adapter set to:", await wrapper.hyperlaneAdapter());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});