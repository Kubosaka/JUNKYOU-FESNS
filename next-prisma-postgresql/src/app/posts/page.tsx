import PostForm from "@/component/posts/PostForm";
import PostList from "@/component/posts/PostList";
import { Box, Link } from "@mui/material";
import { Suspense } from "react";

export default async function Post() {
  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <PostForm />
        <PostList />
        <Link href="/" sx={{ marginX: "auto" }}>
          マップに戻る
        </Link>
      </Suspense>
    </Box>
  );
}
