const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Soham:Soham123@soham.zuyhnor.mongodb.net/SportsReconnect?retryWrites=true&w=majority&appName=Soham", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/protected'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'GameOfficialsHub API is running',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to GameOfficialsHub API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/register',
        login: 'POST /api/login',
        profile: 'GET /api/me'
      },
      protected: {
        dashboard: 'GET /api/dashboard',
        official: 'GET /api/official/dashboard',
        organizer: 'GET /api/organizer/dashboard',
        admin: 'GET /api/admin'
      }
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`👑 Admin Login: admin@gameofficials.com / Admin@123`);
}); 