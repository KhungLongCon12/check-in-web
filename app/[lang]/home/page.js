"use client";

// import React from 'react';
import { Layout, theme } from "antd";
const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { useUserContext } from "@/app/components/provider";
import HomePage from "../../components/home/home_page";
export default function Home({ params }) {
  const { lang } = React.use(params);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const options = useUserContext();
  return (
    <React.Fragment>
      <CssBaseline />
      <HomePage lang={lang} />
    </React.Fragment>
  );
}
