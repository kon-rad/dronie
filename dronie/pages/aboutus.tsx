import { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box, Flex, Input, Image, Button, Text } from "@chakra-ui/react";
import { createPost } from "../services/createNFT";
import { useWeb3React } from "@web3-react/core";
import CreateForm from "../components/createForm";

const Profile: NextPage = () => {

  return (
    <div className={styles.container}>
      <Flex justifyContent="center" alignItems="center" m="12" direction="column">
          <Text fontSize="4xl" color="gray.100">Built with:</Text>
          <Text fontSize="xl" color="gray.100">Polygon</Text>
          <Text fontSize="xl" color="gray.100">IPFS nft.storage</Text>
          <Text fontSize="xl" color="gray.100">typescript, react.js, next.js, hardhat, leaflet, firebase</Text>
      </Flex>
    </div>
  );
};

export default Profile;
