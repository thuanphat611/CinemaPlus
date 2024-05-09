const express = require('express');
const path = require('path');

const app = express();
const PORT = 3030

app.get('/', (req, res) => {
  res.status(200).json({"status": "OK"});
})

app.use('/assets', express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});