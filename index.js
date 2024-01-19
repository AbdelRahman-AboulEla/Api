const express = require("express");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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
    res.status(500).send(`Error fetching chapters: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
