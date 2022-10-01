import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import WorldWind from "@nasaworldwind/worldwind";
import { useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Info } from "../Info";

export const Globe = () => {
  const [location, setLocation] = useState(null);
  const [current, setCurrent] = useState(true);
  const [open, setOpen] = useState(false);
  WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);
  const wwd = useRef(null);
  const atmosphereLayer = useRef(null);
  const starfieldLayer = useRef(null);
  const modelLayer = useRef(null);

  useEffect(() => {
    const socket = io("localhost:8080");
    if (!current) {
      return;
    }

    socket.on("update", (response) => {
      console.log(current);
      if (!current) {
        return;
      }
      setLocation(response);
    });

    return () => {
      socket.off("update");
    };
    //eslint-disable-next-line
  }, [current]);

  useEffect(() => {
    // if (!location) {
    //   return;
    // }
    wwd.current = new WorldWind.WorldWindow("canvasOne");
    wwd.current.addLayer(new WorldWind.BMNGOneImageLayer(), {
      category: "background",
      minActiveAltitude: 0,
    });
    const now = new Date();
    atmosphereLayer.current = new WorldWind.AtmosphereLayer();
    atmosphereLayer.current.time = now;

    starfieldLayer.current = new WorldWind.StarFieldLayer();
    starfieldLayer.current.time = now;

    wwd.current.addLayer(atmosphereLayer.current);
    wwd.current.addLayer(new WorldWind.CompassLayer());
    wwd.current.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd.current));
    wwd.current.addLayer(new WorldWind.ViewControlsLayer(wwd.current));
    wwd.current.addLayer(starfieldLayer.current);

    modelLayer.current = new WorldWind.RenderableLayer();
    wwd.current.addLayer(modelLayer.current);
  }, []);

  useEffect(() => {
    if (!location) {
      return;
    }

    if (!current) {
      return;
    }
    const now = new Date();

    atmosphereLayer.current.time = now;
    starfieldLayer.current.time = now;

    let position = new WorldWind.Position(
      location.latitude,
      location.longitude,
      location.altitude * 1000
    );

    const config = {
      dirPath: WorldWind.configuration.baseUrl + "images/collada_models/iss",
    };

    var colladaLoader = new WorldWind.ColladaLoader(position, config);
    colladaLoader.load("/ISS.dae", function (colladaModel) {
      colladaModel.scale = 400000;
      modelLayer.current.removeAllRenderables();
      modelLayer.current.addRenderable(colladaModel);
    });
    wwd.current.redraw();
  }, [location, current]);

  const goToLocation = (location) => {
    wwd.current.goTo(
      new WorldWind.Location(location.latitude, location.longitude)
    );
  };

  const getLocation = useCallback(async () => {
    const response = await fetch(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );
    const data = await response.json();
    setCurrent(true);
    setLocation(data);
    goToLocation(data);
  }, []);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const getLocationByTime = async (time) => {
    const response = await fetch(
      `https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps=${time}`
    );
    const data = await response.json();
    console.log(data);
    setCurrent(false);
    setLocation(data[0]);
    goToLocation(data[0]);
    const now = new Date();

    atmosphereLayer.current.time = new Date(time * 1000);
    starfieldLayer.current.time = new Date(time * 1000);

    let position = new WorldWind.Position(
      data[0].latitude,
      data[0].longitude,
      data[0].altitude * 1000
    );

    const config = {
      dirPath: WorldWind.configuration.baseUrl + "images/collada_models/iss",
    };

    var colladaLoader = new WorldWind.ColladaLoader(position, config);
    colladaLoader.load("/ISS.dae", function (colladaModel) {
      colladaModel.scale = 400000;
      modelLayer.current.removeAllRenderables();
      modelLayer.current.addRenderable(colladaModel);
    });
    wwd.current.redraw();
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value === "currentTime") {
      getLocation();
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date(e.target.datetime.value).getTime() / 1000;
    getLocationByTime(time);
  };

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex" }}>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "max-content",
            ml: 3,
          }}
        >
          <FormControl sx={{ color: "white", mt: 5 }}>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ color: "#ededed" }}
            >
              Show ISS Location for:
            </FormLabel>
            <RadioGroup
              sx={{ display: "flex", flexDirection: "row" }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="currentTime"
              onChange={handleChange}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="currentTime"
                control={<Radio sx={{ color: "white" }} />}
                label="Current Time"
              />
              <FormControlLabel
                value="specificTime"
                control={<Radio sx={{ color: "white" }} />}
                label="Specific Time"
              />
            </RadioGroup>
          </FormControl>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: open ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            <TextField
              type="datetime-local"
              id="datetime"
              inputProps={{ style: { color: "#ededed" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ededed",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ededed",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#4377e8",
                  },
                },
                '& input[type="datetime-local"]::-webkit-calendar-picker-indicator':
                  {
                    // color: "white",
                    filter:
                      "invert(78%) sepia(0%) saturate(6558%) hue-rotate(84deg) brightness(127%) contrast(116%)",
                  },
              }}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: 5,
                marginTop: 2,
                width: "min-content",
                alignSelf: "end",
              }}
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifySelf: "end",
          }}
        >
          {location && <Info location={location} />}
        </Box>
      </Box>

      <Box sx={{ width: "50%", height: "99%" }}>
        <canvas
          id="canvasOne"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          Your browser does not support HTML5 Canvas.
        </canvas>
      </Box>
    </Box>
  );
};
