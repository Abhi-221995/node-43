const express = require("express");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const path = require("path");
const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("error", error));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/url", urlRoute);
app.use("/", staticRoute);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});

//   return res.end(`
//     <html>
//     <head></head>
//     <body>
//       <ol>
//       ${allUrls.map(
//         (url) =>
//           `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`
//       )}
//       </ol>
//     </body>
//     </html>`);
// });

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
