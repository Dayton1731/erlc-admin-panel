require("dotenv").config();
const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI);

const headers = {
  Authorization: `Bearer ${process.env.ERLC_API_KEY}`
};

app.get("/api/players", async (req, res) => {
  try {
    const r = await axios.get(
      `https://api.policeroleplay.community/v1/server/${process.env.ERLC_SERVER_ID}/players`,
      { headers }
    );
    res.json(r.data);
  } catch {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

app.get("/api/calls", async (req, res) => {
  try {
    const r = await axios.get(
      `https://api.policeroleplay.community/v1/server/${process.env.ERLC_SERVER_ID}/calls`,
      { headers }
    );
    res.json(r.data);
  } catch {
    res.status(500).json({ error: "Failed to fetch calls" });
  }
});

app.listen(3000, () => console.log("Running"));
