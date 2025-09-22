// server/createAdmin.js
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const connectDB = require('./config/db');
require('dotenv').config();

async function createAdmin() {
  await connectDB();
  const username = process.env.ADMIN_USER || 'admin';
  const password = process.env.ADMIN_PASS || 'password123';

  const exists = await User.findOne({ username });
  if (exists) {
    console.log('Admin already exists');
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();
  console.log('Admin user created:', username);
  process.exit(0);
}

createAdmin().catch(err => { console.error(err); process.exit(1); });
