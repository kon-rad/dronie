import { db, geofire } from '../utils/firebase';
import { collection, addDoc } from "firebase/firestore";

export const writeMedia = async (
    nft: any,
    isForSale: boolean,
    lat: string,
    lng: string,
    fileUrl: string,
) => {
    console.log("writeMedia: ", nft, isForSale, lat, lng, fileUrl);

    const hash = geofire.geohashForLocation([parseFloat(lat), parseFloat(lng)]);

    try {
        const docRef = await addDoc(collection(db, "media"), {
            tokenId: nft.url,
            name: nft.name,
            description: nft.description,
            isForSale: isForSale,
            geohash: hash,
            lat: lat,
            lng: lng,
            fileUrl: fileUrl,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
