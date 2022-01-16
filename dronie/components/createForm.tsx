import { useEffect, useState } from "react";
import {
    Input,
    Flex,
    Textarea,
    Center,
    Box,
    Image,
    Button,
} from "@chakra-ui/react";
import { storeNFT } from "../services/nftStorage";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { getIpfsUrl, splitDomain } from "../utils/storage";
import { uploadToFirebase, writeMedia } from "../services/firebaseWrite";
import { getDownloadURL } from "firebase/storage";
import { uploadImageToIPFS } from "../services/createPost";

import { create as ipfsHttpClient } from "ipfs-http-client";

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

type Props = {
    onSubmit: any;
};

const devMode = false;

const CreateForm = (props: Props) => {
    const [fileUrl, setFileUrl] = useState<string>("");
    const [IPFSFileUrl, setIPFSFile] = useState<string>("");
    const [cloudFileUrl, setCloudFileUrl] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [lat, setLat] = useState<string>("");
    const [lng, setLng] = useState<string>("");
    const [isMinted, setIsMInted] = useState<boolean>(false);
    const [nft, setNFT] = useState<any>(null);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    // const files = acceptedFiles.map((file: any) => (
    //     <Box key={file.path} m="2">
    //         {file.path} - {file.size} bytes
    //     </Box>
    // ));

    const onImageUpload = async (snapshotRef: any) => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const newCloudFileUrl = await getDownloadURL(snapshotRef);
        setCloudFileUrl(newCloudFileUrl);
    };

    // const uploadFilesToNFTStorage = async () => {
    //     let results = [];
    //     console.log("acceptedFiles: ", acceptedFiles);
    //     for (let i in acceptedFiles) {
    //         const f: any = acceptedFiles[i];
    //         const fileName = f.name || f.key;
    //         try {
    //             debugger;
    //             const nftData: any = await storeNFT(name, description, f);
    //             // const response = await axios.get(
    //             //     getIpfsUrl(splitDomain(nftData.url))
    //             // );
    //             nftData["metadata"] = nftData.data;
    //             // nftData["metadata"] = nftData.metadata;
    //             console.log("nftData: ", nftData);
    //             const d = new Date();
    //             nftData[
    //                 "added"
    //             ] = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    //             results.push(nftData);
    //             // console.log(
    //             //     "image: ",
    //             //     getIpfsUrl(splitDomain(nftData["metadata"].image))
    //             // );
    //         } catch (e: any) {
    //             alert(`Error uploading ${fileName}: ${e.toString()}`);
    //         }
    //     }
    //     console.log("results: ", results);
    //     return results;
    // };
    const handleUpload = async () => {
        const f: any = acceptedFiles[0];
        uploadToFirebase(name, f, onImageUpload);

        if (devMode) {
            // const nfts = await uploadFilesToNFTStorage();
            // const nft = nfts[0];
            // const newFileUrl = getIpfsUrl(splitDomain(nft["metadata"].image));
            // setFileUrl(newFileUrl);
            // setNFT(nft)
        } else {
            // const added = await client.add(data);
            const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");
            const data = JSON.stringify({
                name,
                description,
                lat,
                lng,
                price,
            });
            const added = await client.add(data);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        }
    };

    async function handleImageUpload(e: any) {
        if (!e || !e.target || !e.target.files || !e.target.files[0]) {
            setIPFSFile("");
            return;
        }
        const file = e.target.files[0];
        try {
            // nft.storage was returning 500 type error - it was reported on discord that it was down
            const added = await client.add(file, {
                progress: (prog) => console.log(`received: ${prog}`),
            });
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setFileUrl(url);
            setIPFSFile(file);
        } catch (error) {
            console.log(`Error uploading file: ${error}`);
        }
    }
    const renderImage = () => {
        if (fileUrl) {
            return (
                <Image
                    src={fileUrl}
                    boxSize="700px"
                    objectFit="cover"
                    border="solid 1px black"
                />
            );
        }
        return "";
    };
    const getIPFSNFTLink = async (nft: any) => {
        const data = JSON.stringify(nft);
        const added = await client.add(data);
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        return url;
    };
    const handleMint = async () => {
        const nft = {
            name,
            description,
            image: fileUrl,
        };
        // 1. first upload to realtime storage to create nft metadata
        const nftUrlLink = await getIPFSNFTLink(nft);
        writeMedia(
            name,
            description,
            true,
            lat,
            lng,
            cloudFileUrl,
            fileUrl,
            nftUrlLink
        );
        props.onSubmit(nft, price, lat, lng, cloudFileUrl, fileUrl);
    };
    const handleSale = () => {};
    return (
        <Box
            borderColor="purple.200"
            bg={"purple.200"}
            maxW="700px"
            width="700px"
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
        >
            <Flex direction="column">
                <Box
                    borderColor="brand.darkslategray"
                    mb={4}
                    h="400px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                >
                    {renderImage()}
                </Box>
                <Input
                    borderColor="brand.darkslategray"
                    w="500px"
                    placeholder="title"
                    onChange={(e: any) => setName(e.target.value)}
                    bg="brand.darkslategray"
                    m="2"
                    value={name}
                    color={"gray.200"}
                />
                <Textarea
                    mb={4}
                    w="500px"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="NFT description"
                    size="sm"
                    borderColor="brand.darkslategray"
                    bg="brand.darkslategray"
                    borderRadius="md"
                    m="2"
                    color={"gray.200"}
                />
                <Box mb={4}>
                    <Input
                        borderColor="brand.darkslategray"
                        w="100px"
                        placeholder="ETH price"
                        onChange={(e) => setPrice(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                        value={price}
                        color={"gray.200"}
                    />
                    <Input
                        borderColor="brand.darkslategray"
                        w="200px"
                        placeholder="Latitude"
                        onChange={(e) => setLat(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                        value={lat}
                        color={"gray.200"}
                    />
                    <Input
                        borderColor="brand.darkslategray"
                        w="200px"
                        placeholder="Longitude"
                        onChange={(e) => setLng(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                        value={lng}
                        color={"gray.200"}
                    />
                </Box>
                <Box m={4}>
                    {/* <div
                        {...getRootProps({ className: "dropzone" })}
                        style={{ cursor: "pointer" }}
                    >
                        <input {...getInputProps()} />
                        <h3>
                            Drag 'n' drop some files here, or click to select
                            files
                        </h3>
                    </div>
                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside> */}

                    <input
                        type="file"
                        name="image"
                        className="CreateForm__img"
                        onChange={handleImageUpload}
                        style={{
                            backgroundColor: "brand.darkslategray",
                        }}
                    />
                </Box>
                <Button m={4} colorScheme={"purple.600"} onClick={handleUpload}>
                    upload file
                </Button>
                <Button
                    m={4}
                    colorScheme={"purple.600"}
                    onClick={handleMint}
                    disabled={cloudFileUrl === ""}
                >
                    mint NFT
                </Button>
                <Button
                    m={4}
                    colorScheme={"purple.600"}
                    onClick={handleSale}
                    disabled={cloudFileUrl === "" || isMinted}
                >
                    put on sale
                </Button>
            </Flex>
        </Box>
    );
};

export default CreateForm;
