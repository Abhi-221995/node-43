const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortUrl(req, res) {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortID = shortid();

  try {
    await URL.create({
      shortId: shortID,
      redirectURL: url,
      visitHistory: [],
    });

    return res.status(200).json({ shortId: shortID });
  } catch (err) {
    console.error("CREATE ERROR:", err); // Add this line
    return res.status(500).json({ error: "Failed to create short URL" });
  }
}

async function handleAnalytics(req, res) {
  const { shortId } = req.params;

  try {
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch analytics" });
  }
}

module.exports = {
  handleGenerateNewShortUrl,
  handleAnalytics,
};
