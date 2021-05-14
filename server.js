// server index html @ /
// server notes up @ /notes
// build api for database
require('dotenv').config();

const express = require('express');
const shortid = require('shortid');

const path = require('path');
const fs = require('fs').promises;

const app = express();
const { PORT } = process.env;

// create a static route to the public folder
app.use(express.static('public'));
// had to add this to get the body parsing from browser on POST
app.use(express.json());

// create route for /notes to notes.hmtl
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// answering the GET request for the notes!//
app.get('/api/notes', async (req, res) => {
  const dbData = await fs.readFile(
    path.join(__dirname, '/db/db.json'),
    'utf-8'
  );
  res.json(JSON.parse(dbData));
});
// answering the POST request for the notes!
app.post('/api/notes', async (req, res) => {
  const postData = req.body;
  // get db data and parse to object.
  let dbData = await fs.readFile(path.join(__dirname, '/db/db.json'), 'utf-8');
  dbData = JSON.parse(dbData);
  // genereate id
  postData.id = shortid.generate();
  dbData.push(postData);
  await fs.writeFile(
    path.join(__dirname, 'db/db.json'),
    JSON.stringify(dbData, null, 2)
  );
  res.end();
});

// every other request should go to to the 'home page'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () => console.log('Server up on Port:', PORT));

// TEST
