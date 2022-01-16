const geofire = require("geofire-common");
import {
    query,
    orderBy,
    startAt,
    endAt,
    collection,
    getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";

export const fetchMarkers = async (center: any) => {
    console.log("fetchMarkers center --- ", center);
    const radiusInM = 50 * 10000;
    const data: any[] = [];

    const bounds = geofire.geohashQueryBounds(center, radiusInM);

    const mediaRef = collection(db, "media");
    for (const b of bounds) {
        const q = query(
            mediaRef,
            orderBy("geohash"),
            startAt(b[0]),
            endAt(b[1])
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
    }
    console.log("fetched data ---- ", data);
    return data.map((e: any) => [e.lat, e.lng]);
};
