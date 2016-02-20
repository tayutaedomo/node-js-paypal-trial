var paypal = require('paypal-rest-sdk');
var express = require('express');
var router = express.Router();

//
// Initialize PayPal
//
paypal.configure({
  mode: process.env.PAYPAL_MODE || '',
  client_id: process.env.PAYPAL_CLIENT_ID || '',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || ''
});


router.get('/', function(req, res, next) {
  paypal.generateToken(function(err, token) {
    res.render('subscriptions/index', {
      'title': 'PayPal Initialization Check',
      token: token || '',
      error: err || {}
    });
  });
});

module.exports = router;

