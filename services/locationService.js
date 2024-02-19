const Location = require("../models/location");

exports.create = async (req, res) => {
  const { title, coordinates } = req.body;
  const fileUrl = req.body.fileUrl;
  try {
    const location = await Location.createLocation(title, coordinates, fileUrl);
    res.json(location);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error", message: error });
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
