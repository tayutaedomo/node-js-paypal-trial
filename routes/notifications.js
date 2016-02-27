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


router.get('/webhooks', function(req, res, next) {
  paypal.notification.webhook.list(function (err, result) {
    if (err) {
      res.render('/plans', {
        title: 'Subscription Plans',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
      });
    } else {
      res.render('notifications/webhooks', {
        title: 'Notification Webhooks',
        error: {},
        data: {
          webhooks: result,
          webhooksStr: beautify(JSON.stringify(result), { indent_size: 2 })
        }
      });
    }
  });
});

module.exports = router;

