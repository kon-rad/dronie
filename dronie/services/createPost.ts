
import { create as ipfsHttpClient } from 'ipfs-http-client';

// @ts-ignore
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

export async function uploadImageToIPFS(file: any): Promise<string> {

    const added = await client.add(file, {
        progress: (prog: any) => console.log(`received: ${prog}`),
    });
    return `https://ipfs.infura.io/ipfs/${added.path}`;
}

export async function getNFTUri(description: string, fileUrl: string, price: string) {

    if (!description || !fileUrl || !price) {
        console.error('Error: missing data: ', description, fileUrl, price);
        return;
    }

    try {
        /* first, upload to IPFS */
        const data = JSON.stringify({
            description,
            image: fileUrl,
        });
        const added = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        // todo: remove dev mode
        // const url = "https://ipfs.infura.io/ipfs/QmeeDx14Vxy4gyD1YCq1M49Ysf9oaDN7XWCjmpFq9yvRf5";
        console.log('creating sale: ', url, price, address);
        /* after file is uploaded to nftStorage, pass the URL to save it on blockchain */
        createSale(url, price, address, provider);
    } catch (error) {
        console.log(`Error uploading file: ${error}`);
    }
}
