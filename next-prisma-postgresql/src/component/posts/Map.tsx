"use client";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L, { LatLngBounds } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { Box } from "@mui/material";

import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import Post from "@/app/posts/page";

type Post = {
  id: number;
  context: string;
  user_id: number;
  area_id: number;
  latitude: number;
  longitude: number;
  created_at: Date;
};

const usePostSwr = () => {
  const { data, error } = useSWR(`/api/posts`, fetcher, {
    refreshInterval: 1000,
  });
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map = () => {
  const bounds = new LatLngBounds(
    [37.42422, 138.77857], // 南西の座標
    [37.426754, 138.779855] // 北東の座標
  );

  const { data } = usePostSwr();

  return (
    <Box
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        width: "50vw",
        height: "50vh",
        marginX: "auto",
        marginTop: "20vh",
      }}
    >
      <MapContainer
        center={[37.425491, 138.779047]}
        zoom={18}
        maxZoom={20}
        scrollWheelZoom={false}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ImageOverlay url="/images/map.png" bounds={bounds} />
        {data &&
          data.map((post: Post) => {
            return (
              <Marker key={post.id} position={[post.latitude, post.longitude]}>
                <Popup>{post.context}</Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </Box>
  );
};

export default Map;
