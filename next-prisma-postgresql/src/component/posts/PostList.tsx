"use client";

import { Box } from "@mui/material";
import useSWR from "swr";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
// import type { SWRConfiguration } from "swr";
import { fetcher } from "@/utils/fetcher";

type Post = {
  id: number;
  context: string;
  user_id: number;
  area_id: number;
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

export default function PostList() {
  const { data, isLoading, isError } = usePostSwr();

  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <Box sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
      <List sx={{ width: "50%" }}>
        {data &&
          data.map((post: Post) => {
            return (
              <Box key={post.id}>
                <ListItem>
                  <ListItemText primary={post.context} />
                </ListItem>
                <Divider />
              </Box>
            );
          })}
      </List>
    </Box>
  );
}
