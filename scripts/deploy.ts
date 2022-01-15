const hre = require('hardhat');

async function main() {
  const Market = await hre.ethers.getContractFactory('DronieMarket');
  const market = await Market.deploy();
  await market.deployed();
  console.log('DronieMarket deployed to: ', market.address);

  const NFT = await hre.ethers.getContractFactory('Dronie');
  const nft = await NFT.deploy(market.address);
  await nft.deployed();
  console.log('Dronie deployed to: ', nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
