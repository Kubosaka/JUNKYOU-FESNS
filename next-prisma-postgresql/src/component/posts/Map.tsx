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
        minZoom={18}
        maxZoom={20}
        scrollWheelZoom={false}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ImageOverlay url="/images/map.png" bounds={bounds} />
        <Marker position={[37.425491, 138.779047]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default Map;
