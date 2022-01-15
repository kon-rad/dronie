import { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box, Flex, Input, Image, Button } from "@chakra-ui/react";
import { createPost } from "../services/createNFT";
import { useWeb3React } from "@web3-react/core";
import CreateForm from "../components/createForm";
import { getDatabase, ref, set } from "firebase/database";
import { db, geofire, firebaseApp } from '../utils/firebase';

import { collection, addDoc } from "firebase/firestore";

const Post: NextPage = () => {
  const web3 = useWeb3React();

  const handleSubmit = (
    description: string,
    fileUrl: string,
    price: string
  ) => {
    console.log("submit");
    if (!web3.account) {
      alert("Please sign in via metamask");
      return;
    }
    writeContentData("123", "name1", "desc1", true);
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

  const writeContentData = async (
    tokenId: string,
    name: string,
    description: string,
    isForSale: boolean
  ) => {
    // [51.5074, 0.1278]
    const lat = 51.5073;
    const lng = 0.1279;
    // [51.5074, 0.1278]
    const hash = geofire.geohashForLocation([lat, lng]);

    // set(ref(db, "media/" + tokenId), {
    //   tokenId: tokenId,
    //   name: name,
    //   description: description,
    //   isForSale: isForSale,
    //   geohash: hash,
    //   lat: lat,
    //   lng: lng,
    // });

    try {
      const docRef = await addDoc(collection(db, "media"), {
        tokenId: tokenId,
        name: name,
        description: description,
        isForSale: isForSale,
        geohash: hash,
        lat: lat,
        lng: lng,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
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
