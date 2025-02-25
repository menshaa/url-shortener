const connectDB = require("./config/database");
const redisClient = require("./config/redis");
const app = require("./app");

// Connect to MongoDB
connectDB();

// Connect to redisd
redisClient.connect().catch(console.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
