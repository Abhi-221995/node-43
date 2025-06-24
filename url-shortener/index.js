const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");
const app = express();

const PORT = process.env.PORT || 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("error", error));

// Middlewares
app.use(express.json());

// Routes
app.use("/url", urlRoute);

// Redirect Handler
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
