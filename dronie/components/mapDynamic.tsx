import dynamic from "next/dynamic";

function MapDynamic() {
  const Map = dynamic(() => import("./map"), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });
  return <Map />;
}

export default MapDynamic;
