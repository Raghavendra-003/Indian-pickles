import express from "express";
import mongoose from "mongoose";
import dns from "node:dns";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const mongoDnsServers = (process.env.MONGO_DNS_SERVERS || "")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (mongoDnsServers.length > 0) {
  dns.setServers(mongoDnsServers);
}

const app = express();

const allowedOrigins = new Set([
  "http://localhost:5000",
  "http://localhost:5173",
  "https://indian-pickles.vercel.app",
  ...(process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
]);

app.use(
  cors({
    origin: [...allowedOrigins],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not set");
    }

    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB_NAME || "pickleDB",
    });
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start backend because MongoDB connection failed:", error);
    process.exit(1);
  }
};

startServer();