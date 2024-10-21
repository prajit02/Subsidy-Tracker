const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/clients', require('./routes/clientRoutes'));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend')));


// Fallback route to serve index.html for any non-API requests (for single-page applications)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Client routes
// app.use('/api/clients', require('./routes/clientRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use('/api/clients', require('./routes/clientRoutes'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));