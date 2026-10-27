require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const userRouter = require("./routes/userRouter");
const adminRoutes = require("./routes/adminRouter");
const BodyType = require("./routes/BodyTypeRouter");
const mealPlanRouter = require("./routes/mealPlanRouter");
const contactRoutes = require("./routes/contactRouter");
const feedbackRoutes = require("./routes/feedbackRouter");

const app = express();

// Middleware
app.use(express.json());

// Standard CORS middleware
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//Routes
app.use("/user", userRouter);
app.use("/admin", adminRoutes);
app.use("/mealplans", mealPlanRouter);
app.use("/bodytype", BodyType);
app.use("/api/contact", contactRoutes);
app.use("/api/feedback", feedbackRoutes);

// Validate required environment variables early
if (!process.env.DATABASE) {
  console.error("Missing required env: DATABASE");
  process.exit(1);
}
if (!process.env.TOKEN_SECRET) {
  console.error("Missing required env: TOKEN_SECRET");
  process.exit(1);
}

// MongoDB connection
const URI = process.env.DATABASE;

mongoose.connect(URI);

// Listen to connection events
const db = mongoose.connection;
db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => console.log("MongoDB connected"));

// Start server after DB is connected
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// for testing the server
app.get("/test", (req, res) => {
  res.send("Server is working");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
