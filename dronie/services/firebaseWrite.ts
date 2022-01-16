import { getDatabase, ref, set } from "firebase/database";
import { db, geofire, firebaseApp } from '../utils/firebase';

import { collection, addDoc } from "firebase/firestore";

export const writeMedia = async (
    tokenId: string,
    name: string,
    description: string,
    isForSale: boolean,
    lat: string,
    lng: string,
) => {
    const hash = geofire.geohashForLocation([parseFloat(lat), parseFloat(lng)]);

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
