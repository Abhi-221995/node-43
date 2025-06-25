const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({});
    return res.render("home", {
      urls: allUrls,
      id: null,
    });
  } catch (err) {
    return res.status(500).send("Failed to load URLs");
  }
});

module.exports = router;
