"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@mui/material";

type Post = {
  content: string;
};

export default function PostForm() {
  const { register, handleSubmit } = useForm<Post>();

  const onSubmit = async (data: Post) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log(resData);
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              id="content"
              label="本文"
              variant="outlined"
              {...register("content")}
            />
            <Button variant="contained" type="submit">
              Contained
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
