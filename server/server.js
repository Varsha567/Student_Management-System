const fs = require('fs');
const path = require('path');

require('dotenv').config();
const express = require('express');


const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/studentRoutes");


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors( {
  origin: 'http://localhost:3000', // Update with your client's URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Serve static files from React app
if (process.env.NODE_ENV === 'production') {
  // Serve static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

