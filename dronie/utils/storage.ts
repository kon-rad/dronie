export const splitDomain = (url: string) => url.split("//")[1];

export const getIpfsUrl = (cid: string) => `https://ipfs.io/ipfs/${cid}`;
