var paypal = require('paypal-rest-sdk');
var express = require('express');
var router = express.Router();
var beautify = require('js-beautify').js_beautify;

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
      title: 'PayPal Initialization Check',
      token: token || '',
      error: err || {}
    });
  });
});

router.get('/plan', function(req, res, next) {
  res.render('subscriptions/plan', {
    title: 'Subscription Plan Creation',
    error: {}
  });
});

router.post('/plan', function(req, res, next) {
  var billingPlanAttributes = createBillingPlanAttributesFrom(req);

  paypal.billingPlan.create(billingPlanAttributes, function (err, billingPlan) {
    if (err) {
      res.render('subscriptions/plan', {
        title: 'Subscription Plan Creation Failed',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 })
      });
    } else {
      res.render('subscriptions/plan', {
        title: 'Subscription Plan Created',
        billingPlan: billingPlan
      });
    }
  });
});

/*
  // Parameter Sample
  var billingPlanAttributes = {
    "merchant_preferences": {
      "auto_bill_amount": "yes",
      "cancel_url": "https://example.com/cancel",
      "return_url": "https://example.com/success",
    },
    "name": "Billing Plan",
    "description": "Monthly billing plan",
    "type": "UNLIMITED", // UNLIMITED or FIXED
    "payment_definitions": [
      {
        "amount": {
          "currency": "USD",
          "value": "5.10"
        },
        "cycles": "0",
        "frequency": "MONTH",
        "frequency_interval": "1",
        "name": "Regular Plan",
        "type": "REGULAR"
      },
      {
        "amount": {
          "currency": "USD",
          "value": "5.10"
        },
        "cycles": "1",
        "frequency": "WEEK",
        "frequency_interval": "1",
        "name": "Trial Plan",
        "type": "TRIAL"
      }
    ]
  };
*/
function createBillingPlanAttributesFrom(req) {
  return {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type
  };
}


module.exports = router;

