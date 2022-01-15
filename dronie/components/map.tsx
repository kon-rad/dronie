import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
const geofire = require("geofire-common");
import { query, orderBy, startAt, endAt, collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebase';

type Props = {};

const Map = (props: Props) => {
    useEffect(() => {
        fetchData();
    }, []);

    // const map = useMap()
    // console.log('map center:', map.getCenter())

    const position = [51.505, -0.09];

    const fetchData = async () => {
        const center = [51.5074, 0.1278];
        const radiusInM = 50 * 1000;
        const data = [];

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
    };

    return (
        <div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Map;
