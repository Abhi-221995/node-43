// ES6 module
import express from "express";

const app = express();

app.use(express.static("dist"));

// API

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      type: "general",
      setup: "Why don't scientists trust atoms?",
      punchline: "Because they make up everything!",
    },
    {
      id: 2,
      type: "programming",
      setup: "Why do programmers prefer dark mode?",
      punchline: "Because the light attracts bugs!",
    },
    {
      id: 3,
      type: "general",
      setup: "What do you call fake spaghetti?",
      punchline: "An impasta!",
    },
    {
      id: 4,
      type: "kids",
      setup: "Why did the bicycle fall over?",
      punchline: "Because it was two-tired!",
    },
    {
      id: 5,
      type: "tech",
      setup: "Why did the computer go to therapy?",
      punchline: "It had too many bytes of emotional baggage!",
    },
  ];

  res.send(jokes);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`serves at localhost:${PORT}`);
});
