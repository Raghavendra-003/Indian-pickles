import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

/* CORS */
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [
      "http://localhost:5000",
      "http://localhost:5173",
      "https://indian-pickles.vercel.app",
    ];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/*  Middleware  */
app.use(express.json());

/*  Routes  */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.use("/api/orders", orderRoutes);

/*  MongoDB  */

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.log("MongoDB Connection Failed ❌", error);
  }

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();