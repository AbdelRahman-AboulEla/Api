// api/route2.js
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    // Your route logic here
    const response = await axios.get(
      "https://manga-lek.net/manga/omniscient-readers/",
      {
        maxRedirects: 5, // Set an appropriate number
        timeout: 5000, // 5000 milliseconds (adjust as needed)
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );

    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
