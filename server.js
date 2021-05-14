// server index html @ /
// server notes up @ /notes
// build api for database


const express = require('express')
const app = express()
const PORT = 3000

// create a static route to the public folder
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT, () => console.log('Server up on Port:',PORT))