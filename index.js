const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const port = process.env.PORT || 3000;

// Use a middleware to handle requests
app.use(express.json());

app.get('/api/fetchMangaChapters/:mangaTitle', async (req, res) => {
  const mangaTitle = req.params.mangaTitle;
  const mangaBaseUrl = 'https://manga-lek.net'; 
  try {
    const response = await axios.get(`${mangaBaseUrl}/manga/${mangaTitle}`);
    
    if (response.status === 200) {
      const dom = new JSDOM(response.data);
      const chapterList = dom.window.document.querySelectorAll('.wp-manga-chapter');
      const chapters = [];

      chapterList.forEach((chapter) => {
        const chapterNumber = chapter.children[0].textContent.trim();
        chapters.push(
          chapterNumber
        );
      });

      res.json(chapters);
    } else {
      console.error(`Failed to load website: ${response.status}`);
      res.status(response.status).send('Failed to load website');
    }
  } catch (error) {
    console.error(`Error fetching chapters: ${error.message}`);
    res.status(500).send('Error fetching chapters');
  }
});

// Export your express app for Vercel
module.exports = app;
