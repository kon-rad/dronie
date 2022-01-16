import { db, geofire } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

export const writeMedia = async (
    name: string,
    description: string,
    isForSale: boolean,
    lat: string,
    lng: string,
    cloudFileUrl: string,
    fileUrl: string
) => {
    console.log("writeMedia: ", name, isForSale, lat, lng, cloudFileUrl, fileUrl);

    const hash = geofire.geohashForLocation([parseFloat(lat), parseFloat(lng)]);

    try {
        const docRef = await addDoc(collection(db, "media"), {
            name: name,
            description: description,
            isForSale: isForSale,
            geohash: hash,
            lat: lat,
            lng: lng,
            cloudFileUrl: cloudFileUrl,
            fileUrl: fileUrl,
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const uploadToFirebase = (fileName: string, file: any, onImageUpload: any) => {
    const storage = getStorage();
    const storageRef = ref(storage, `media/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot: any) => {
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
                case "paused":
                    console.log("Upload is paused");
                    break;
                case "running":
                    console.log("Upload is running");
                    break;
            }
        },
        (error: any) => {
            console.error("Error uploading to cloud storage: ", error)
        },
        () => {
            onImageUpload(uploadTask.snapshot.ref);
        }
    );
};
