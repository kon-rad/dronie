import { useState } from "react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box, Flex, Input, Image, Button } from "@chakra-ui/react";
import { createPost } from "../services/createNFT";
import { useWeb3React } from "@web3-react/core";
import CreateForm from "../components/createForm";

const Profile: NextPage = () => {

  return (
    <div className={styles.container}>
      <Flex justifyContent="center" alignItems="center" direction="column">
      </Flex>
    </div>
  );
};

export default Profile;
