require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// auth routes
app.use("/api/auth", authRoutes);

// task routes
app.use("/api/tasks", taskRoutes);

// protected test route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed protected route 🎉",
    user: req.user
  });
});

// database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch((err) => console.log(err));

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});