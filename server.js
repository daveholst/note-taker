// server index html @ /
// server notes up @ /notes
// build api for database


const express = require('express');
const path = require('path');

const app = express()
const PORT = 3000

// create a static route to the public folder
app.use(express.static('public'))

// create route for /notes
app.get('/notes', (req, res) => {
  res.sendFile('./public/notes.html')
})

app.listen(PORT, () => console.log('Server up on Port:',PORT))