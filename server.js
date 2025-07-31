const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://sajaddanish256:BHT3w3VbQLc7jxPk@formdb.2gkemvk.mongodb.net/FORMDBB?retryWrites=true&w=majority&appName=formDB"
  )
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  message: String,
});

const User = mongoose.model("test", userSchema);

app.post("/api/submit", async (req, res) => {
  try {
    console.log("Received body:", req.body);

    const { username, email, password, message } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email, and password are required." });
    }

    const newUser = new User({ username, email, password, message });
    console.log("Saving user:", newUser);

    await newUser.save();

    res.json({ message: "✅ Data saved to MongoDB" });
  } catch (err) {
    console.error("❌ Error saving user:", err);
    res.status(500).json({ message: `❌ Failed to save user: ${err.message}` });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
