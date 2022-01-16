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
import { storeNFT } from "../services/nftStorage";
import { useDropzone } from "react-dropzone";
import axios from "axios";

type Props = {
    onSubmit: any;
};

export const splitDomain = (url: string) => url.split("//")[1];

export const getIpfsUrl = (cid: string) => `https://ipfs.io/ipfs/${cid}`;

const CreateForm = (props: Props) => {
    const [fileUrl, setFileUrl] = useState<any>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [lat, setLat] = useState<string>("");
    const [lng, setLng] = useState<string>("");

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file: any) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const uploadFiles = async () => {
        let results = [];
        console.log("acceptedFiles: ", acceptedFiles);
        for (let i in acceptedFiles) {
            const f: any = acceptedFiles[i];
            const fileName = f.name || f.key;
            try {
                const nftData: any = await storeNFT(fileName, description, f);
                const response = await axios.get(
                    getIpfsUrl(splitDomain(nftData.url))
                );
                nftData["metadata"] = response.data;
                const d = new Date();
                nftData[
                    "added"
                ] = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
                results.push(nftData);
                console.log(
                    "image: ",
                    getIpfsUrl(splitDomain(nftData["metadata"].image))
                );
            } catch (e: any) {
                alert(`Error uploading ${fileName}: ${e.toString()}`);
            }
        }
        console.log("results: ", results);
        return results;
    };
    const handleSubmit = async () => {
        const nfts = await uploadFiles();
        if (!nfts || nfts.length < 1) {
            return;
        }
        const nft = nfts[0];
        const newFileUrl = getIpfsUrl(splitDomain(nft["metadata"].image));
        console.log("nft final: ---- ", nft);
        setFileUrl(newFileUrl);
        props.onSubmit(nft, price, lat, lng, newFileUrl);
    };

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
                    value={name}
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
                        value={price}
                    />
                    <Input
                        borderColor="brand.darkslategray"
                        w="200px"
                        placeholder="Latitude"
                        onChange={(e) => setLat(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                        value={lat}
                    />
                    <Input
                        borderColor="brand.darkslategray"
                        w="200px"
                        placeholder="Longitude"
                        onChange={(e) => setLng(e.target.value)}
                        bg="brand.darkslategray"
                        m="2"
                        value={lng}
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
