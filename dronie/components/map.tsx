import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvent,
} from "react-leaflet";
import { fetchMarkers } from "../services/firebaseRead";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapSearchForm } from './mapSearchForm';

type Props = {};

function SetViewOnClick({ animateRef }) {
    const map = useMapEvent("click", (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: animateRef.current || false,
        });
    });

    return null;
}

const center = [51.505, -0.09];
const zoom = 2;

function DisplayPosition({ map }) {
    const [position, setPosition] = useState(map.getCenter());

    console.log("map: ", map);

    const onClick = useCallback(() => {
        map.setView(center, zoom);
    }, [map]);

    const onMove = useCallback(() => {
        setPosition(map.getCenter());
    }, [map]);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);
    const updateMarkers = async () => {
        const markersData = await fetchMarkers(center);
    };

    return (
        <p>
            latitude: {position.lat.toFixed(4)}, longitude:{" "}
            {position.lng.toFixed(4)}
            <br />
            zoom: {map._zoom}
            <br />
            <button onClick={onClick}>reset</button>
        </p>
    );
}

const getLatLngArray = (obj: any) => {
    if (obj.lat && obj.lng) {
        return [obj.lat, obj.lng];
    }
    return null;
}

const Map = (props: Props) => {
    const [markers, setMarkers] = useState<any>([]);
    const [map, setMap] = useState(null);
    const updateMarkers = async () => {
        const latLngArray = getLatLngArray(map?.getCenter());
        if (!latLngArray) {
            return;
        }
        const markersData = await fetchMarkers(latLngArray);
        setMarkers(markersData);
    };
    useEffect(() => {
        updateMarkers();
    }, []);
    useEffect(() => {
        updateMarkers();
    }, [map]);
    const animateRef = useRef(false);

    const onMove = useCallback(() => {
        updateMarkers();
    }, [map]);

    useEffect(() => {
        if (!map) return;
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);

    const handleSearch = () => {
        console.log("search form")
    }

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={center}
                zoom={zoom}
                scrollWheelZoom={false}
                whenCreated={setMap}
                style={{ height: "500px", width: "1200px" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((position, idx) => {
                    return (
                        <Marker key={`marker-${idx}`} position={position}>
                            <Popup>
                                <span>position: {position}</span>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        ),
        [markers]
    );
    return (
        <div>
            {map ? <DisplayPosition map={map} /> : null}
            {displayMap}
            <MapSearchForm onSearch={handleSearch} />
        </div>
    );
};

export default Map;
