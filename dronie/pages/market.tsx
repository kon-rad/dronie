import { useState, useEffect } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box, Flex, Input, Image, Button } from "@chakra-ui/react";
import DisplayList from "../components/displayList";
import { fetchMarketNFTs } from "../services/fetchMarketNFTs";
import { ethers } from "ethers";

const Market: NextPage = () => {
  const [nfts, setNfts] = useState<any>([]);
  const [loadingState, setLoadingState] = useState<string>("not-loaded");

  // todo: update this to be an env variable
  const provider = ethers.getDefaultProvider("http://localhost:8545");

  useEffect(() => {
    setLoadingState("loading");
    fetchData();
  }, []);

  const fetchData = async () => {
    if (provider) {
      const nftItems = await fetchMarketNFTs(provider);
      if (nftItems) {
        setNfts(nftItems);
      }
      setLoadingState("loaded");
    }
  };

  console.log('nfts: ', nfts);
  
  return (
    <div className={styles.container}>
      <Flex justifyContent="center" alignItems="center" direction="column">
        Market
        <DisplayList nfts={nfts} />
      </Flex>
    </div>
  );
};

export default Market;
