const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRouter = require('./routes/authRoutes');

const port = process.env.PORT; 
const dbURI = process.env.DB_URI;
let dbState = '';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));
app.use('/assets', express.static(path.join(__dirname, '../public')));

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.status(200).json({ 'state': 'Online', 'Database_state': dbState });
})

//Database------------------------------------------------------------
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Failed to connect to database:', err);
});

mongoose.connection.on('connected', () => {
  dbState = 'Connnected';
});

mongoose.connection.on('error', (err) => {
  dbState = 'Error';
});

mongoose.connection.on('disconnected', () => {
  dbState = 'Disconnnected';
});
//-----------------------------------------------------------------------

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});