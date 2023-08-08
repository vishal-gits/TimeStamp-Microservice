// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
let derivedDate, unix, utc;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", function (req, res) {
  derivedDate = new Date();
  unix = derivedDate.getTime();
  utc = derivedDate.toUTCString();
  res.status(200).json({ unix: unix, utc: utc });
});

app.get("/api/:date", function (req, res) {
  const { date } = req.params;

  console.log(date);
  if (+date) {
    derivedDate = new Date(+date);
  } else {
    derivedDate = new Date(date);
  }

  if (+derivedDate) {
    unix = derivedDate.getTime();
    utc = derivedDate.toUTCString();
    // console.log(unix, utc);
    res.status(200).json({ unix: unix, utc: utc });
  } else {
    res.status(400).json({ error: "Invalid Date" });
    // console.log("Date format is invalid");
  }
});

app.get("/api/*", (req, res) => {
  res.status(400).json({ error: "Invalid Date" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
