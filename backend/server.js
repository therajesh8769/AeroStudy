require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const multer = require('multer');
const cors = require("cors");

const path = require('path');
const { listFiles } = require('./fetchfiles');
const app = express();
const PORT = process.env.PORT || 4000;
  

app.use(cors());  

// Multer Setup for File Uploads
// const upload = multer({ dest: 'uploads/' });
app.use(cors({
    origin: "https://aerostudy.vercel.app", // Allow only frontend requests
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // If using cookies or authentication
  }));



  app.use(express.static(path.join(__dirname, "build")));

// Google Drive Authentication
// const auth = new google.auth.GoogleAuth({
//   keyFile: 'service-account.json', // Path to your service account key
//   scopes: ['https://www.googleapis.com/auth/drive'],
// });

// const drive = google.drive({ version: 'v3', auth });

// const FOLDER_ID = "1-k_aUiGJh1aT4BU2LJOICWv3TjXf8a2w"; // Replace with your Google Drive folder ID

// Upload File to Google Drive
// app.post('/upload', upload.single('file'), async (req, res) => {
//   if (!req.file) return res.status(400).send('No file uploaded.');

//   const filePath = path.join(__dirname, req.file.path);

//   try {
//     const fileMetadata = {
//       name: req.file.originalname,
//       parents: [FOLDER_ID], // Folder ID in Google Drive
//     };

//     const media = {
//       mimeType: req.file.mimetype,
//       body: fs.createReadStream(filePath),
//     };

//     const response = await drive.files.create({
//       resource: fileMetadata,
//       media: media,
//       fields: 'id',
//     });

//     // Delete local file after upload
//     fs.unlinkSync(filePath);

//     res.json({ fileId: response.data.id, message: 'File uploaded successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error uploading file');
//   }
// });
// Route to fetch files based on subject
app.get('/api/files/:subject', async (req, res) => {
    try {
      const subject = req.params.subject;
      const files = await listFiles(subject);
      res.json(files);
      console.log(files)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching files', error });
    }
  });


  app.get("*", (req, res) => {
    // Updated path to match your structure
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
  });
// Start Server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
 module.exports = app;