import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRoutes)

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
  });
});

// global error handling
app.use((err, req, res, next) => {
  console.log(err.message);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

// connect mongodb
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api/v1`);
  });
});
