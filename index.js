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
  const patternDate = /^\d{4}-\d{2}-\d{2}$/;
  const patternUnix = /^\d{13}$/;
  const patternString = ' ';
  const isCorrectFormatDate = patternDate.test(date); 
  const isCorrectFormatUnix = patternUnix.test(date); 
  const isCorrectFormatString = date.includes(patternString); 
  // console.log(isCorrectFormatDate)
  // console.log(isCorrectFormatUnix)
  // console.log(isCorrectFormatString)
  if (isCorrectFormatDate == false && isCorrectFormatUnix == false && isCorrectFormatString == false){
    res.json({error : "Invalid Date"})
  }else(
    next()
  )
}

app.get("/api/", (req, res) => {
  // const now = new Date();
  // const year = now.getFullYear();
  // const month = now.getMonth() + 1; // months are zero-indexed, so we need to add 1
  // const day = now.getDate();
  // const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const date_string = new Date()
  // console.log(date)
  // console.log(typeof date)
  const utcTime = new Date(date_string).toUTCString()
  const unixTime = new Date(date_string).getTime()
  res.json({unix: unixTime, utc: utcTime})
})

app.get("/api/:date",checkFormatDate, (req, res) => {
  let date_string = req.params.date
  // console.log(typeof date)
  // console.log(date)
  if(date_string.length == 13){
    date_string = Number(date_string) 
  }
  const utcTime = new Date(date_string).toUTCString()
  const unixTime = new Date(date_string).getTime()
  res.json({unix: unixTime, utc: utcTime})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
