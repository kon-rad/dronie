import { NFTStorage, File } from "nft.storage";

const apiKey = process.env.NEXT_PUBLIC_STORAGE_KEY;
const client = new NFTStorage({ token: apiKey });

const storeNFT = async (
    nftName: string,
    description: string,
    imageFile: any
) => {
    const metadata = await client.store({
        name: nftName,
        description,
        image: imageFile,
    });
    console.log("metadata: ", metadata);
    return metadata;
};

export { storeNFT };
