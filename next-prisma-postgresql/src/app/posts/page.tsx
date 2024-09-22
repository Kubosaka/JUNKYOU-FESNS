import PostForm from "@/component/posts/PostForm";
import { Box } from "@mui/material";
import { Suspense } from "react";

export default async function Post() {
  return (
    <Box>
      <Suspense fallback={<div>Loading...</div>}>
        <PostForm />
      </Suspense>
    </Box>
  );
}
