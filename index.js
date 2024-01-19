const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const corsOptions = {
  origin: "https://api-ivory-sigma.vercel.app/",
  methods: "GET", 
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to my Express.js app!");
});
app.get("/fetchMangaChapters/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://manga-lek.net/manga/kill-the-hero`
    );
    res.send("i am here in the reponse");
    res.send(response.status);
  } catch (error) {
    res.status(error.status).send(`Error fetching chapters: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
