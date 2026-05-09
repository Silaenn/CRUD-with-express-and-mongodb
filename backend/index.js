import "dotenv/config";
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : null;

app.use(
  cors(
    corsOrigins
      ? {
          origin: corsOrigins,
          methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
          allowedHeaders: ["Content-Type"],
        }
      : undefined
  )
);
app.use(express.json());

let isConnected = false;
let connectPromise = null;

const connectToDatabase = async () => {
  if (isConnected) return;

  if (!mongoDBURL) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(mongoDBURL).then(() => {
      isConnected = true;
      console.log("App connected to database");
    });
  }

  await connectPromise;
};

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.use("/books", booksRoute);

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to Books API");
});

if (!process.env.VERCEL) {
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

export default app;
