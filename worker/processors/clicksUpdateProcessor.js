const Url = require("../../models/Url");

module.exports = async (data) => {
  const { shortCode } = data;
  await Url.updateOne({ shortCode }, { $inc: { clicks: 1 } });
};
