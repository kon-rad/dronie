import { useEffect } from 'react';
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box, Flex } from "@chakra-ui/react";
import MapDynamic from "../components/mapDynamic";
import { getDatabase, ref, child, get } from "firebase/database";

const Home: NextPage = () => {
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `media`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className={styles.container}>
      <Flex justifyContent="center" alignItems="center" direction="column">
        <Box maxWidth="1200px" my={12}>
          DRONIE HOMEPAGE
        </Box>
        <MapDynamic />
        <Box maxWidth="1200px" my={12}>
          VIDEO SAERCH HERE
        </Box>
      </Flex>
    </div>
  );
};

export default Home;
