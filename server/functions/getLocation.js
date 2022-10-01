const fetch = require("node-fetch");

const getLocationFn = async () => {
  const response = await fetch(
    "https://api.wheretheiss.at/v1/satellites/25544"
  );
  const data = await response.json();
  return data;
};

module.exports = { getLocationFn };
