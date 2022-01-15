import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
const geofire = require("geofire-common");
import { getDatabase, ref, set } from "firebase/database";

type Props = {};

const Map = (props: Props) => {
  const position = [51.505, -0.09];
  // Find cities within 50km of London
  const center = [51.5074, 0.1278];
  const radiusInM = 50 * 1000;

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const bounds = geofire.geohashQueryBounds(center, radiusInM);
  const promises = [];

  const db = getDatabase();

  for (const b of bounds) {
    const q = db
      .collection("media")
      .orderBy("geohash")
      .startAt(b[0])
      .endAt(b[1]);

    promises.push(q.get());
  }

  // Collect all the query results together into a single list
  Promise.all(promises)
    .then((snapshots) => {
      const matchingDocs = [];

      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const lat = doc.get("lat");
          const lng = doc.get("lng");

          // We have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
          const distanceInKm = geofire.distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc);
          }
        }
      }

      return matchingDocs;
    })
    .then((matchingDocs) => {
      // Process the matching documents
      // ...
    });

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
      sup
    </div>
  );
};

export default Map;
