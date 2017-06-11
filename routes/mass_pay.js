"use strict";

var express = require('express');
var router = express.Router();

var debug = require('debug')('node-js-paypal-trial:routes:mass_pay');
var beautify = require('js-beautify').js_beautify;
var moment = require('moment');
var MassPay = require('node-paypal-masspayments')


function create_mass_pay() {
  return new MassPay({
    user:      process.env.PAYPAL_USER,
    pwd:       process.env.PAYPAL_PWD,
    signature: process.env.PAYPAL_SIGNATURE
    //emailsubject: ''
  });
}


router.get('/pay', function(req, res, next) {
  res.render('mass_pay/pay', {
    title: 'Mass Pay',
    data: {
      uniqueId: moment().valueOf()
    }
  });
});

router.post('/pay', function(req, res, next) {
  var mass_pay = create_mass_pay();

  var requests = [
    {
      email: req.body.email,
      amount: req.body.amount,
      uniqueId: req.body.uniqueId,
      note: 'Request for ' + req.body.uniqueId
    }
  ];

  var batch = new MassPay.PaymentBatch(requests);

  mass_pay.pay(batch, function(err, result) {
    res.render('mass_pay/pay', {
      title: 'Mass Pay',
      data: {
        uniqueId: moment().valueOf(),
        error: err ? err : null,
        errorStr: err ? beautify(JSON.stringify(err.toString()), {indent_size: 2}) : null,
        result: result,
        resultStr: beautify(JSON.stringify(result), {indent_size: 2})
      }
    });
  });
});


module.exports = router;

