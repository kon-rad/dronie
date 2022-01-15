import { Box, SimpleGrid } from '@chakra-ui/react';
import NFTCard from './NFTCard';
import { NFT } from '../utils/types';

type Props = {
    nfts: NFT[],
}
const DisplayList = (props: Props) => {
    return (
        <Box px={6}>
            <SimpleGrid minChildWidth="280px" spacing="10px">
                {props.nfts.map(
                    (nft: any, i: number) =>
                    nft && <NFTCard index={i} nft={nft} key={`${nft.tokenId}_${i}`} />
                )}
            </SimpleGrid>
        </Box>
    )
}

export default DisplayList;