"use strict";

var express = require('express');
var router = express.Router();

var debug = require('debug')('node-js-paypal-trial:routes:adaptive_payments');
var beautify = require('js-beautify').js_beautify;
var Paypal = require('paypal-adaptive');


function create_paypal_sdk() {
  return new Paypal({
    userId:    process.env.PAYPAL_USER,
    password:  process.env.PAYPAL_PWD,
    signature: process.env.PAYPAL_SIGNATURE,
    sandbox:   process.env.PAYPAL_MODE != 'production'
  });
}


router.get('/payment_details', function(req, res, next) {
  res.render('adaptive_payments/payment_details.ejs', {
    title: 'Payment Details',
    data: {}
  });
});

router.post('/payment_details', function(req, res, next) {
  var paypal_sdk = create_paypal_sdk();
  var params = {
    transactionId: req.body.id
  };

  paypal_sdk.paymentDetails(params, function(err, response) {
    debug('payment_details err', err);

    res.render('adaptive_payments/payment_details', {
      title: 'Payment Details',
      data: {
        error: err ? err : null,
        errorStr: err ? beautify(JSON.stringify(err.toString()), { indent_size: 2 }) : null,
        result: response,
        resultStr: beautify(JSON.stringify(response), { indent_size: 2 })
      }
    });
  });
});


module.exports = router;

