import { Box, Typography } from "@mui/material";
import nasaLogo from "../../images/NASA_logo.png";

export const Navbar = () => {
  return (
    <Box
      sx={{
        background: "#363636",
        width: "100%",
        height: "7%",
        color: "#ededed",
        boxShadow: "0px 3px 20px gray",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          marginLeft: "1%",
          px: 1,
          cursor: "pointer",
          transition: "all .15s",
          "&:hover": {
            background: "#525252",
          },
        }}
      >
        <img src={nasaLogo} alt="Logo" style={{ height: "90%" }} />
        <Typography sx={{ marginLeft: 0.5 }}>ISS Tracker</Typography>
      </Box>
    </Box>
  );
};
