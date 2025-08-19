const baseUrlCDN =
  process.env.NODE_ENV === "production"
    ? "https://cdn.stage.fund4crypto.net"
    : "https://localhost:3004";

export default baseUrlCDN;
