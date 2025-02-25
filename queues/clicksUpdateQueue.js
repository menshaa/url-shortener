const Queue = require("bull");
const clicksUpdateQueue = new Queue("clicksUpdateQueue", {
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
});

module.exports = clicksUpdateQueue;
