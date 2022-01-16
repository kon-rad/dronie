import { useState } from "react";
import {
    Box,
    Radio,
    RadioGroup,
    Stack,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

interface Props {
    onSearch: any,
}

const MapSearchForm = (props: Props) => {
    const [format, setFormat] = useState<string>("any");
    const [kind, setKind] = useState<string>("any");
    return (
        <Box boxShadow='2xl' p='6' m='6' rounded='md' bg='gray'>
            <FormControl as="fieldset">
                <FormLabel as="legend">media format</FormLabel>
                <RadioGroup onChange={setFormat} value={format}>
                    <Stack direction="row">
                        <Radio colorScheme="purple" value="any">
                            any
                        </Radio>
                        <Radio colorScheme="purple" value="image">
                            image
                        </Radio>
                        <Radio colorScheme="purple" value="video">
                            video
                        </Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
            <FormControl as="fieldset">
                <FormLabel as="legend">media kind</FormLabel>
                <RadioGroup onChange={setKind} value={kind}>
                    <Stack direction="row">
                        <Radio colorScheme="purple" value="any">
                            any
                        </Radio>
                        <Radio colorScheme="purple" value="image">
                            raw
                        </Radio>
                        <Radio colorScheme="purple" value="video">
                            edited
                        </Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export { MapSearchForm };
