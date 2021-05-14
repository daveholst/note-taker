// server index html @ /
// server notes up @ /notes
// build api for database
require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const { PORT } = process.env;

// create a static route to the public folder
app.use(express.static('public'));

// create route for /notes to notes.hmtl
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(PORT, () => console.log('Server up on Port:', PORT));

// TEST
