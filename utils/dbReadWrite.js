const path = require('path');
const fs = require('fs').promises;

// database reader - reads the JSONdb file and returns an object
const readDb = async () => {
  try {
    const dbData = await fs.readFile(
      path.join(__dirname, '../db/db.json'),
      'utf-8'
    );
    return JSON.parse(dbData);
  } catch (error) {
    console.error(error);
  }
};

// database writer - writes an object to the JSONdb file
const writeDb = async (dataToWrite) => {
  try {
    await fs.writeFile(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify(dataToWrite, null, 2)
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = { readDb, writeDb };
