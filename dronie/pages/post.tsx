import { useState } from "react";
import type { NextPage } from "next";
import { Box, Flex, Input, Image, Button } from "@chakra-ui/react";
import { createPost } from "../services/createNFT";
import { useWeb3React } from "@web3-react/core";
import CreateForm from "../components/createForm";
import { writeMedia } from "../services/firebaseWrite";

const Post: NextPage = () => {
    const web3 = useWeb3React();

    const handleSubmit = async (
        nft: any,
        price: string,
        lat: string,
        lng: string,
        cloudFileUrl: string,
        fileUrl: string,
    ) => {
        console.log("submit", nft, price, lat, lng, fileUrl);
        if (!web3.account) {
            alert("Please sign in via metamask");
            return;
        }
        if (web3.account && web3.library) {
            await createPost(web3.account, web3.library, nft, price);
            writeMedia(nft, true, lat, lng, cloudFileUrl, fileUrl);
        } else {
            console.error(
                "Error: could not make post. Missing one of these required parameters:",
                web3.account,
                web3.library
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
