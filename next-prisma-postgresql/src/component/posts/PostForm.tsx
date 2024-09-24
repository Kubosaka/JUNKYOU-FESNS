"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@mui/material";

type Post = {
  content: string;
};

type Location = {
  latitude: number;
  longitude: number;
};

export default function PostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<Post>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function getCurrentLocation() {
    return new Promise<Location>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  const onSubmit = async (data: Post) => {
    setIsLoading(true);
    const postData = {
      content: data.content,
      latitude: 0.1,
      longitude: 0.1,
    };
    try {
      const location = await getCurrentLocation();
      postData.latitude = location.latitude;
      postData.longitude = location.longitude;
    } catch (error) {
      console.error("Failed to get location", error);
    }
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.status === 201) {
      window.alert("投稿しました");
    } else {
      window.alert("投稿に失敗しました");
    }
    reset();
    setIsLoading(false);
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "25ch" }, marginX: "auto" }}
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
              {...register("content", { required: true })}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={!isValid || isLoading}
            >
              投稿する
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
