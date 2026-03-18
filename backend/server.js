import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(",")
      : ["http://localhost:5173"], // keep only frontend port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* ================= Middleware ================= */
app.use(express.json());

/* ================= Routes ================= */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.use("/api/orders", orderRoutes);

/* ================= MongoDB ================= */
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB Connected ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("MongoDB Connection Failed ❌", error);
    process.exit(1); // exit if DB fails
  }
};

startServer();