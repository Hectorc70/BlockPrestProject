const hre = require("hardhat");

async function main() {
  // const smartname = 'LoanPool'
  // const smartname = 'Reputation'
  // const smartname = 'Vault'
  // const smartname = 'Lock'
  const smartname = 'BlockPrestMXNBHub'



  const adapter = '0x3C5154a193D6e2955650f9305c8d80c18C814A68'
  const Wrapper = await hre.ethers.getContractFactory(smartname);
  let wrapper = null
  ///depende del contrato se pasan parametros
  if(smartname === 'LoanPool' ){
    MXNWrapperAdress = '0x46c967c9329a7549c69b34D78AD21eca53B9E94A'
    ReputationAdress = '0xA4990a1f673B9D594f743C471E1AdDB0E7962633'
    wrapper = await Wrapper.deploy(MXNWrapperAdress,ReputationAdress);
  }else if(smartname === 'Reputation' ){
    wrapper = await Wrapper.deploy();
  }
  else if(smartname === 'Vault' ){
    ReputationAdress = '0xA4990a1f673B9D594f743C471E1AdDB0E7962633'
    wrapper = await Wrapper.deploy(ReputationAdress);
  }
  else if(smartname === 'Lock' ){
    //24 hrs
    const unlockTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 horas desde ahora

    wrapper = await Wrapper.deploy(unlockTime);
  }
  else if(smartname === 'BlockPrestMXNBHub' ){
    const addressMXNBToken = '0x82B9e52b26A2954E113F94Ff26647754d5a4247D'
    wrapper = await Wrapper.deploy(adapter,addressMXNBToken);
  }
  await wrapper.waitForDeployment();
  console.log("" + smartname + " deployed to:",await wrapper.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
