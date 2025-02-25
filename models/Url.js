const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  shortCode: { type: String, unique: true, required: true },
  longUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Url", UrlSchema);
