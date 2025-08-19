import { Box, CircularProgress } from "@mui/material";

export const loadingView = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
};
