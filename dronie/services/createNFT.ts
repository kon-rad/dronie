import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { dronieAddress, marketAddress } from "../../config";

import NFT from "../../artifacts/contracts/Dronie.sol/Dronie.json";
import Market from "../../artifacts/contracts/DronieMarket.sol/DronieMarket.json";

export async function createPost(
    address: string,
    provider: Web3Provider,
    nft: any,
    price: string
): Promise<string | undefined> {
    if (!nft.url || !price) {
        console.error("Error: missing data: ", nft.url, price);
        return;
    }

    try {
        console.log("creating sale: ", nft.url, price, address);
        /* after file is uploaded to nftStorage, pass the URL to save it on blockchain */
        await createSale(nft.url, price, address, provider);
    } catch (error) {
        console.log(`Error uploading file: ${error}`);
    }
}

async function createSale(
    url: string,
    price: string,
    address: string,
    provider: Web3Provider
) {
    const signer = provider.getSigner();

    console.log("create post 1", url, price, address);
    /* next, create the item */
    const nftContract = new ethers.Contract(dronieAddress, NFT.abi, signer);
    let transaction = await nftContract.createToken(url);
    const tx = await transaction.wait();
    console.log("tx:", tx);
    if (tx.events.length < 1) {
        console.error("tx has no events. tx: ", tx);
        return;
    }
    console.log("create post 2");
    const event = tx.events[0];
    const value = event.args[2];
    const tokenId = value.toNumber();

    const ethPrice = ethers.utils.parseUnits(price, "ether");
    console.log("create post 3");

    /* then list the item for sale on the marketplace */
    const marketContract = new ethers.Contract(
        marketAddress,
        Market.abi,
        signer
    );
    let listingPrice = await marketContract.getListingPrice();
    listingPrice = listingPrice.toString();
    console.log("create post 4");

    transaction = await marketContract.createMarketItem(
        dronieAddress,
        tokenId,
        ethPrice,
        {
            value: listingPrice,
        }
    );
    console.log("create post --- 5");
    await transaction.wait();
}
