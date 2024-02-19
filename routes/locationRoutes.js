// routes/locationRoutes.js
const express = require("express");
const locationService = require("../services/locationService");

const router = express.Router();

router.post("/", locationService.create);
router.get("/", locationService.getAll);

module.exports = router;
