const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const Url = require("../models/Url");
const redisClient = require("../config/redis");
const clicksUpdateQueue = require("../queues/clicksUpdateQueue");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) return res.status(400).json({ error: "Invalid URL" });

  let shortCode = crypto
    .createHash("md5")
    .update(longUrl)
    .digest("hex")
    .slice(0, 6);

  let existingUrl = await Url.findOne({ shortCode });
  let attempt = 1;

  while (existingUrl) {
    shortCode = crypto
      .createHash("md5")
      .update(longUrl + attempt)
      .digest("hex")
      .slice(0, 6);
    existingUrl = await Url.findOne({ shortCode });
    attempt++;
  }

  await Url.create({ shortCode, longUrl });
  await redisClient.set(shortCode, longUrl);

  res.json({ shortUrl: `${process.env.BASE_URL}/api/${shortCode}` });
});

router.get("/:shortCode", async (req, res) => {
  const { shortCode } = req.params;
  const cachedUrl = await redisClient.get(shortCode);
  if (cachedUrl) {
    await clicksUpdateQueue.add({ shortCode });
    return res.redirect(cachedUrl);
  } else {
    const url = await Url.findOne({ shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });

    await clicksUpdateQueue.add({ shortCode });
    await redisClient.set(shortCode, url.longUrl);

    return res.redirect(url.longUrl);
  }
});

router.get("/:shortCode/stats", async (req, res) => {
  const { shortCode } = req.params;
  const url = await Url.findOne({ shortCode });
  if (!url) return res.status(404).json({ error: "URL not found" });

  return res.status(200).json({
    shortUrl: `${process.env.BASE_URL}/api/${shortCode}`,
    longUrl: url.longUrl,
    clicks: url.clicks,
  });
});

module.exports = router;
