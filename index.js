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
app.get("/fetchMangaChapters/:mangaTitle", async (req, res) => {
  const mangaTitle = req.params.mangaTitle;
  const mangaBaseUrl = "https://manga-lek.net";
  try {
    
const response = await axios.get(`${mangaBaseUrl}/manga/${mangaTitle}`, {
  timeout: 5000, // 5 seconds timeout
});

    if (response.status === 200) {
      const dom = new JSDOM(response.data);
      const chapterList =
        dom.window.document.querySelectorAll(".wp-manga-chapter");
      const chapters = [];

      chapterList.forEach((chapter) => {
        const chapterNumber = chapter.children[0].textContent.trim();
        chapters.push(chapterNumber);
      });

      res.json(chapters);
    } else {
      console.error(`Failed to load website: ${response.status}`);
      res.status(response.status).send("Failed to load website");
    }
  } catch (error) {
    
    res.status(500).send(`Error fetching chapters: ${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
