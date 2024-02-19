const Location = require("../models/location");

exports.create = async (req, res) => {
  const { title, lat, lng, fileUrl } = req.body;
  try {
    const location = await Location.createLocation(title, lat, lng, fileUrl);
    res.json(location);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error", message: error.toString() });
  }
};

exports.getAll = async (req, res) => {
  try {
    const locations = await Location.getAllLocations();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
