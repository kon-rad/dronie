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

type Props = {
  onSubmit: any;
};

const CreateForm = (props: Props) => {
  const [fileUrl, setFileUrl] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleSubmit = () => {
    props.onSubmit(description, fileUrl, price);
  };

  async function handleImageUpload(e: any) {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) {
      setFileUrl(null);
      return;
    }
    const file = e.target.files[0];
    try {
      //   const url = await uploadImageToIPFS(file);
      const url =
        "https://ipfs.infura.io/ipfs/QmSJLAJNJuyQKJPswksXo7nKoZV1M8sd5JsnGWMJDAemZh";
      setFileUrl(url);
      // setFileUrl(
      //     'https://ipfs.infura.io/ipfs/QmQVDpasygPGJ6dQZzCzzFvDZoPgPbprSfp6pyhkZLr8DL',
      // );
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
        <Textarea
          mb={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="NFT description"
          size="sm"
          borderColor="brand.darkslategray"
          bg="brand.darkslategray"
        />
        <Box mb={4}>
          <Input
            borderColor="brand.darkslategray"
            w="100px"
            placeholder="ETH price"
            onChange={(e) => setPrice(e.target.value)}
            bg="brand.darkslategray"
          />
        </Box>
        <Box mb={4}>
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
        <Button mb={4} colorScheme={"purple"} onClick={handleSubmit}>
          submit
        </Button>
      </Flex>
    </Box>
  );
};

export default CreateForm;
