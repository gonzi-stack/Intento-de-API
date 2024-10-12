require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const v1Router = require('./routes/v1');
const { initializeCache } = require('./utils/cache');

const app = express();
const PORT = process.env.PORT || 3000;

initializeCache();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado correctamente a MongoDB'))
  .catch((err) => console.error('Error al conectar con MongoDB:', err));

// Middleware
app.use(helmet());
app.use(express.json());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 
});
app.use(limiter);

// Routes
app.use('/api/v1', v1Router);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API corriendo en el puerto ${PORT}`);
});