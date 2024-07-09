const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT; 

app.get('/', (req, res) => {
  res.status(200).json({"status": "OK"});
})

app.use('/assets', express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});