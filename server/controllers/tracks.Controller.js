const { getLocationFn } = require("../functions/getLocation");

const getLocation = async (_, res) => {
  const data = await getLocationFn();

  res.send(data);
};

module.exports = { getLocation };
