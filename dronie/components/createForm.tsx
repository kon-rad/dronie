import { useState } from "react";
import {
    Input,
    Flex,
    Textarea,
    Center,
    Box,
    Image,
    Button,
} from "@chakra-ui/react";
import { uploadImageToIPFS } from "../services/createNFT";
import { storeNFT } from "../services/nftStorage";
import { useDropzone } from "react-dropzone";
import axios from 'axios';

type Props = {
    onSubmit: any;
};

export const splitDomain = url => url.split("//")[1];

export const getIpfsUrl = cid => `https://ipfs.io/ipfs/${cid}`;

const CreateForm = (props: Props) => {
    const [fileUrl, setFileUrl] = useState<any>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [lat, setLat] = useState<string>("");
    const [lng, setLng] = useState<string>("");

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const uploadFiles = async () => {
        let results = [];
        console.log("acceptedFiles: ", acceptedFiles);
        for (let i in acceptedFiles) {
          const f = acceptedFiles[i];
          const fileName = f.name || f.key;
          try {
            const nftData = await storeNFT(fileName, "Achievement Badge", f);
            const response = await axios.get(getIpfsUrl(splitDomain(nftData.url)));
            nftData["metadata"] = response.data;
            const d = new Date();
            nftData["added"] = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
            results.push(nftData);
            console.log("image: " ,getIpfsUrl(splitDomain(nftData["metadata"].image)))
          } catch (e) {
            alert(`Error uploading ${fileName}: ${e.toString()}`);
          }
        }
        console.log('results: ', results);
        return results;
    }
    const handleSubmit = () => {
        const nfts = uploadFiles();
        
        // props.onSubmit(name, description, fileUrl, price, lat, lng);
    };

    async function handleImageUpload(e: any) {
        if (!e || !e.target || !e.target.files || !e.target.files[0]) {
            setFileUrl(null);
            return;
        }
        const file = e.target.files[0];
        //   const url = await uploadImageToIPFS(file);
        const url =
            "https://ipfs.infura.io/ipfs/QmSJLAJNJuyQKJPswksXo7nKoZV1M8sd5JsnGWMJDAemZh";
        setFileUrl(url);
        // setFileUrl(
        //     'https://ipfs.infura.io/ipfs/QmQVDpasygPGJ6dQZzCzzFvDZoPgPbprSfp6pyhkZLr8DL',
        // );

        const fileName = file.name || file.key;
        try {
            const nftData = await storeNFT(name, description, fileName);
            //   const response = await axios.get(getIpfsUrl(splitDomain(nftData.url)));
            //   nftData["metadata"] = response.data;
            //   const d = new Date();
            //   nftData["added"] = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
            //   results.push(nftData);
            console.log("nft storage done: ", nftData);
        } catch (e: any) {
            alert(`Error uploading ${fileName}: ${e.toString()}`);
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
    return (
        <Box
            borderColor="brand.gradienta"
            bg={"brand.gradienta"}
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
                />
                <Box mb={4}>
                    <Input
                        borderColor="brand.darkslategray"
                        w="100px"
                        placeholder="ETH price"
                        onChange={(e) => setPrice(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                    />
                    <Input
                        borderColor="brand.darkslategray"
                        w="200px"
                        placeholder="Latitude"
                        onChange={(e) => setLat(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                    />
                    <Input
                        borderColor="brand.darkslategray"
                        w="200px"
                        placeholder="Longitude"
                        onChange={(e) => setLng(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                    />
                </Box>
                <Box m={4}>
                    <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <h3>
                            Drag 'n' drop some files here, or click to select
                            files
                        </h3>
                    </div>
                    <aside>
                        <h4>Files</h4>
                        <ul>{files}</ul>
                    </aside>
                </Box>
                <Button mb={4} colorScheme={"purple"} onClick={handleSubmit}>
                    submit
                </Button>
            </Flex>
        </Box>
    );
};

export default CreateForm;
