import { Box, Typography } from "@mui/material";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Info = ({ location }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        background: "#363636",
        color: "#ededed",
        boxShadow: "-5px 1px 5px gray",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        px: 3,
      }}
    >
      <Box>
        <Typography variant="p">Latitude</Typography>
        <Typography>
          {Math.abs(Math.floor(location.latitude * 100) / 100)}{" "}
          {location.latitude < 0 ? "S" : "N"}
        </Typography>
      </Box>
      <Box>
        <Typography variant="p">Longitude</Typography>
        <Typography>
          {Math.abs(Math.floor(location.longitude * 100) / 100)}{" "}
          {location.longitude < 0 ? "W" : "E"}
        </Typography>
      </Box>
      <Box>
        <Typography variant="p">Altitude</Typography>
        <Typography>{Math.floor(location.altitude * 10) / 10} km</Typography>
      </Box>
      <Box>
        <Typography variant="p">Speed</Typography>
        <Typography>{Math.floor(location.velocity)} km/h</Typography>
      </Box>
      <Box>
        <Typography variant="p">Visibility</Typography>
        <Typography>{capitalizeFirstLetter(location.visibility)}</Typography>
      </Box>
      <Box>
        <Typography variant="p">Solar Panels Orientation</Typography>
        <Typography>
          {Math.abs(Math.floor(location.solar_lat * 100) / 100)}{" "}
          {location.solar_lat < 0 ? "S" : "N"}{" "}
          {Math.abs(Math.floor(location.solar_lon * 100) / 100)}{" "}
          {location.solar_lon < 0 ? "W" : "E"}
        </Typography>
      </Box>
    </Box>
  );
};
