// Database
const connectDB = require("../config/database");
connectDB();

// Queues
const clicksUpdateQueue = require("../queues/clicksUpdateQueue");

// Processors
const clicksUpdateProcessor = require("./processors/clicksUpdateProcessor");

clicksUpdateQueue.process(async (job) => {
  await clicksUpdateProcessor(job.data);
});
