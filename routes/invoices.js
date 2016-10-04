"use strict";

var express = require('express');
var router = express.Router();

var beautify = require('js-beautify').js_beautify;
var paypal = require('paypal-rest-sdk');

//
// Initialize PayPal
//
paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID || '',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || ''
});


router.get('/create', function(req, res, next) {
  res.render('invoices/create', {
    title: 'Invoice Create',
    data: {}
  });
});

router.post('/create', function(req, res, next) {
  var params = {
    merchant_info: {
      email: req.body.merchant_email,
      business_name: req.body.business_name
    },
    billing_info: [
      {
        email: req.body.payer_email
      }
    ],
    cc_info: [
      {
        email: req.body.merchant_email
      }
    ],
    items: [
      {
        name: req.body.name,
        description: req.body.description,
        quantity: req.body.quantity,
        unit_price: {
          currency: req.body.currency,
          value: req.body.unit_price
        }
      }
    ]
  };
  paypal.invoice.create(params, function(err, result) {
    if (err) {
      res.render('invoices/create', {
        title: 'Invoice Create Failed',
        data: {
          error: err,
          errorStr: beautify(JSON.stringify(err), { indent_size: 2 })
        }
      });
    } else {
      res.render('invoices/create', {
        title: 'Invoice Created',
        data: {
          result: result,
          resultStr: beautify(JSON.stringify(result), { indent_size: 2 })
        }
      });
    }
  });
});

router.get('/send', function(req, res, next) {
  res.render('invoices/send', {
    title: 'Invoice Send',
    data: {}
  });
});

router.post('/send', function(req, res, next) {
  paypal.invoice.send(req.body.id, function(err, result) {
    if (err) {
      res.render('invoices/send', {
        title: 'Invoice Send Failed',
        data: {
          error: err,
          errorStr: beautify(JSON.stringify(err), { indent_size: 2 })
        }
      });
    } else {
      res.render('invoices/send', {
        title: 'Invoice Sent',
        data: {
          result: result,
          resultStr: beautify(JSON.stringify(result), { indent_size: 2 })
        }
      });
    }
  });
});


module.exports = router;

