const mongoose = require('mongoose');

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/geogroup';
  const localFallbackUri = 'mongodb://127.0.0.1:27017/geogroup';

  try {
    // Mask credentials for clean logging
    const maskedUri = primaryUri.includes('@')
      ? primaryUri.replace(/\/\/.*@/, '//****:****@')
      : primaryUri;
    console.log(`Attempting to connect to MongoDB: ${maskedUri}`);

    const conn = await mongoose.connect(primaryUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 4000, // Trigger fallback fast if unreachable
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`Primary MongoDB connection failed: ${error.message}`);
    if (primaryUri !== localFallbackUri) {
      try {
        console.log(`Falling back to local MongoDB: ${localFallbackUri}`);
        const conn = await mongoose.connect(localFallbackUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected (Fallback): ${conn.connection.host}`);
      } catch (fallbackError) {
        console.error(`Fallback MongoDB connection failed: ${fallbackError.message}`);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
