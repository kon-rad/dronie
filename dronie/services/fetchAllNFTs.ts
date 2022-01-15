import axios from 'axios';

export const getAllNFTs = async () => {
    const url = 'https://api.nftport.xyz/v0/nfts?chain=ethereum&include=metadata';

    const res = await axios.get(url, {
        headers: {
            'Authorization': process.env.NFT_PORT_KEY || '',
            'Content-Type': 'application/json'
        }
    });
    if (res.status !== 200) {
        console.error('Error: request failed', res);
        return [];
    }
    return res.data.nfts;
}