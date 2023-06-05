// index.js
// where your node app starts

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

/* ============ SOLUTION ============ */
app.get("/api/", (req, res) => {
  let utc = new Date().toUTCString();
  let unix = Date.parse(utc);
  return res.json({ unix: unix, utc: utc });
});

app.get("/api/:date", (req, res) => {
  let utc, unix;
  let d = req.params.date;

  if (/^[0-9]+$/.test(d)) {
    d = new Date(parseInt(req.params.date)).toISOString();
    unix = parseInt(req.params.date);
    utc = new Date(d).toUTCString();
  } else {
    d = new Date(req.params.date);

    if (d instanceof Date && !isNaN(d.getTime())) {
      unix = parseInt(Math.floor(d.getTime()));
      utc = d.toUTCString();
    } else {
      return res.json({ error : "Invalid Date" })
    }
  }
  return res.json({unix: unix, utc: utc });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
