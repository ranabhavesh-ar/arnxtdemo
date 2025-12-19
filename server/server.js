require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const Model = require("./models/Model");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Serve uploaded files
app.use("/models", express.static(path.join(__dirname, "uploads/models")));

// Multer storage config
const storage = multer.diskStorage({
  destination: "uploads/models",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Upload API
app.post("/upload", upload.single("model"), async (req, res) => {
  try {
    const file = req.file;

    const SERVER_URL = process.env.SERVER_URL; 
  

    const glbUrl = `${SERVER_URL}/models/${file.filename}`;

    const newModel = new Model({
      filename: file.filename,
      glbUrl,
      usdzUrl: null, // add later
    });

    await newModel.save();

    res.json({
      success: true,
      id: newModel._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Fetch model by ID
app.get("/model/:id", async (req, res) => {
  const model = await Model.findById(req.params.id);
  if (!model) return res.status(404).json({ error: "Not found" });
  res.json(model);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
