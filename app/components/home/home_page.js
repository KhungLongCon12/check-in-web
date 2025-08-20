"use client";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function HomePage({ lang }) {
  const [data, setData] = useState([]);

  const handleGetData = async () => {
    const res = await fetch("/api/home/get-user-data");
    const users = await res.json();
    setData(users);
  };
  console.log("click get data", data);

  return (
    <Box>
      <Typography>Hello</Typography>
      <Button onClick={handleGetData}>Get data</Button>
    </Box>
  );
}
