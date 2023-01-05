// index.js
// where your node app starts
require('dotenv').config()
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const checkFormatDate = (req, res, next) => {
  const date = req.params.date
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  const isCorrectFormat = pattern.test(date); 
  console.log(isCorrectFormat)
  if (isCorrectFormat == false){
    res.json({error : "Invalid Date"})
  }else(
    next()
  )
}

app.get("/api/", (req, res) => {
  const date = new Date().toString()
  const utcTime = new Date(date).toUTCString()
  const unixTime = new Date(date).getTime()
  res.json({unix: unixTime, utc: utcTime})
})

app.get("/api/:date",checkFormatDate, (req, res) => {
  const date = req.params.date
  console.log(typeof date)
  const utcTime = new Date(date).toUTCString()
  const unixTime = new Date(date).getTime()
  res.json({unix: unixTime, utc: utcTime})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
