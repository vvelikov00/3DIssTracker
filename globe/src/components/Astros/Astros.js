import { Box, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export const Astros = () => {
  const [astros, setAstros] = useState([]);

  useEffect(() => {
    getAstros();
  }, []);

  const getAstros = async () => {
    const response = await fetch("http://api.open-notify.org/astros.json");
    const data = await response.json();
    let temp = [];
    data.people.forEach((element) => {
      if (element.craft === "ISS") {
        temp.push(element);
      }
    });
    setAstros(temp);
  };

  return (
    <Box>
      {astros.length > 0 && (
        <Typography sx={{ color: "#ededed" }}>
          There are currently {astros.length}{" "}
          {astros.length > 1 ? "humans" : "human"} in ISS
        </Typography>
      )}
      <List sx={{ listStyleType: "disc", pl: 4, color: "#ededed", pt: 0 }}>
        {astros.map((astro, index) => (
          <ListItem
            key={index}
            sx={{ p: 0.2, display: "list-item", color: "white" }}
          >
            <Typography variant="p" sx={{ color: "#ededed" }}>
              {astro.name}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
