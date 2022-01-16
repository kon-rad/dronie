import { ethers } from "ethers";
import { dronieAddress, marketAddress } from "../../config";
import axios from "axios";
import { getIpfsUrl, splitDomain } from '../utils/storage';

import NFT from "../../artifacts/contracts/Dronie.sol/Dronie.json";
import Market from "../../artifacts/contracts/DronieMarket.sol/DronieMarket.json";

export const fetchMarketNFTs = async (provider: any) => {
  /* create a generic provider and query for unsold market items */
  const nftContract = new ethers.Contract(dronieAddress, NFT.abi, provider);
  const marketContract = new ethers.Contract(
    marketAddress,
    Market.abi,
    provider
  );
  console.log("marketContract: ", marketContract);

  const data = await marketContract.fetchMarketItems();
  console.log("data: ", data);

  const getItem = async (i: any) => {
    console.log("item: ", i);
    debugger;
    const tokenUri = await nftContract.tokenURI(i.tokenId);
    console.log("tokenUri: ", tokenUri);
    if (/undefined/.test(tokenUri)) {
      return;
    }
    let realTokenUri = tokenUri;
    if (/^ipfs:\/\//.test(tokenUri)) {
      realTokenUri = getIpfsUrl(splitDomain(tokenUri))
    }
    const meta = await axios.get(realTokenUri);
    let price = ethers.utils.formatUnits(i.price.toString(), "ether");
    let imageUrl = meta.data.image;
    if (/^ipfs:\/\//.test(meta.data.image)) {
      imageUrl = getIpfsUrl(splitDomain(meta.data.image))
    }

    const item = {
      price,
      tokenId: i.tokenId.toNumber(),
      seller: i.seller,
      owner: i.owner,
      sold: i.sold,
      image: imageUrl,
      description: meta.data.description,
    };
    console.log("item meta: ", meta);
    return item;
  };

  /* map over items returned from smart contract and format
   * them as  well as fetch their token metadata
   */
  const items = await Promise.all((data || []).map(getItem));
  console.log("done loading");
  return items;
};
