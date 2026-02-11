const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

// Contact route
app.post("/contact", async (req, res) => {
  try {
    console.log("Received:", req.body);

    const contact = new Contact(req.body);
    await contact.save();

    res.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🚨 THIS LINE IS MANDATORY
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
