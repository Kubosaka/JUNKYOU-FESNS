import dynamic from "next/dynamic";
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
      <a href="/posts">Posts</a>
    </>
  );
}
