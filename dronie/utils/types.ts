
export type NFT = {
    tokenId: string,
    description: string,
    image: string,
    name: string,

    price?: string | undefined,
    seller?: string | undefined,
    sold?: boolean | undefined,
    owner?: string | undefined,
    contract_address?: string | undefined,
    opensea_cached_image?: string | undefined,
    mint_date?: string | undefined,
    chain?: string | undefined,
}

export type AllNFT = {
    contract_address: string,
    image: string,
    name: string,
    opensea_cached_image: string,
    token_id: string,
    description: string,
    mint_date: string,
    chain: string,
}
