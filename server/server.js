// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Multer configuration for image uploads
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
  }
})

const upload = multer({ storage: storage })

// Serve static files from uploads folder
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marketplace';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 }) // 5 second timeout
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('⚠️  Make sure MongoDB is installed and running. Starting server without database connection...');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (without database)`);
    });
  });
