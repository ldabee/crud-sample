const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const tests = require('./routes/test');
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json({ type: '*/*' }))
  .use(cors())
  .use(bodyParser.json({ limit: '100mb' })) //ADDED FOR THE IMPORT
  .use(bodyParser.urlencoded({ extended: false, limit: '100mb' }));
// This displays message that the server running and listening to specified port
try {
  app.use('/', tests);
} catch (e) {
  console.log("Error on Express Node > ", e);
}

app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6


