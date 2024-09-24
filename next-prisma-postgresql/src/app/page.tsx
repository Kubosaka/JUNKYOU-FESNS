import { Box, Link } from "@mui/material";
import dynamic from "next/dynamic";
import PostForm from "@/component/posts/PostForm";
import React from "react";

export default async function Post() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/component/posts/Map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <>
      <Map />
      <Box
        sx={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <PostForm />
        <Link href="/posts" sx={{ marginX: "auto" }}>
          投稿一覧
        </Link>
      </Box>
    </>
  );
}
