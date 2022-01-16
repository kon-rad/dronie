import { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box, Flex, Input, Image, Button } from "@chakra-ui/react";
import { createPost } from "../services/createNFT";
import { useWeb3React } from "@web3-react/core";
import CreateForm from "../components/createForm";
import { writeMedia } from '../services/firebaseWrite';

const Post: NextPage = () => {
  const web3 = useWeb3React();

  const handleSubmit = (
    name: string,
    description: string,
    fileUrl: string,
    price: string,
    lat: string,
    lng: string
  ) => {
    console.log("submit");
    if (!web3.account) {
      alert("Please sign in via metamask");
      return;
    }
    writeMedia("123", name, description, true, lat, lng);
    if (web3.account && web3.library && description && fileUrl && price) {
      //   createPost(web3.account, web3.library, description, fileUrl, price);
    //   writeContentData("123", "name1", "desc1", true);
    } else {
      console.error(
        "Error: could not make post. Missing one of these required parameters:",
        web3.account,
        web3.library,
        description,
        fileUrl,
        price
      );
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      direction="column"
      paddingTop="60px"
      paddingBottom="120px"
    >
      <CreateForm onSubmit={handleSubmit} />
    </Flex>
  );
};

export default Post;
