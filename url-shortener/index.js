const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connect");
const app = express();

const PORT = process.env.PORT || 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.log("error", error));

//middlewares
app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
