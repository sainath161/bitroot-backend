import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./db/db.js";
import contactRoute from "./routes/contact.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for example, uploaded files)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/contact", contactRoute);

// Database Connection
connectToDB();

// Root route
app.get("/", (req, res) => {
  res.send("Server running successfully!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started at port http://localhost:${PORT}`);
});
