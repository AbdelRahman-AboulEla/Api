// api/route1.js
const axios = require("axios");

module.exports = async (req, res) => {
  try {
    // Your route logic here
    const response = await axios.get("https://www.google.com/");

    res.status(200).json({ data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
