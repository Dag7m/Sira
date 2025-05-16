const app = require('./app');
const { initializeDatabase } = require('./config/database'); // ✅ Remove invalid `pool` import
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function startServer() {
  try {
    // ✅ Initialize DB and get pool
    const pool = await initializeDatabase();

    // ✅ Make pool available globally or through app.locals
    app.locals.db = pool;

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`MySQL connected to ${process.env.DB_HOST}/${process.env.DB_NAME}`);
    });
  } catch (error) {
    console.error('Failed to initialize application:', error.message);
    process.exit(1);
  }
}

startServer();
