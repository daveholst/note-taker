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
// TODO: REFACTOR: DRY --database reader
const readDb = async () => {
  const dbData = await fs.readFile(
    path.join(__dirname, '/db/db.json'),
    'utf-8'
  );
  return JSON.parse(dbData);
};

// TODO: REFACTOR: DRY -- database writer
const writeDb = async (dataToWrite) => {
  await fs.writeFile(
    path.join(__dirname, 'db/db.json'),
    JSON.stringify(dataToWrite, null, 2)
  );
};

// create route for /notes to notes.hmtl
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// answering the GET request for the notes!//
app.get('/api/notes', async (req, res) => {
  const dbData = await readDb();
  res.json(dbData);
});
// answering the POST request for the notes!
app.post('/api/notes', async (req, res) => {
  const postData = req.body;
  // genereate id
  postData.id = shortid.generate();
  // get db data and parse to object.
  const dbData = await readDb();
  dbData.push(postData);
  await writeDb(dbData);
  res.end();
});

// every other request should go to to the 'home page'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// delete a note!
app.delete('/api/notes/:id', async (req, res) => {
  const noteId = req.params.id;
  // get db data and parse to object.
  const dbData = await readDb();
  // find note with that index and remove.
  const modifiedDbData = dbData.filter((e) => e.id !== noteId);
  // write new array to db
  await writeDb(modifiedDbData);
  res.end();
  console.log(noteId);
});

app.listen(PORT, () => console.log('Server up on Port:', PORT));

// TEST
