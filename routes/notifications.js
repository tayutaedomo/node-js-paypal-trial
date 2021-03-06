var paypal = require('paypal-rest-sdk');
var ipn = require('pp-ipn');
var express = require('express');
var router = express.Router();
var beautify = require('js-beautify').js_beautify;

//
// Initialize PayPal
//
paypal.configure({
  mode: process.env.PAYPAL_MODE || 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID || '',
  client_secret: process.env.PAYPAL_CLIENT_SECRET || ''
});


router.get('/webhooks', function(req, res, next) {
  paypal.notification.webhook.list(function (err, result) {
    if (err) {
      res.render('notifications/webhooks', {
        title: 'Notification Webhooks',
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

router.get('/webhook_events', function(req, res, next) {
  var pageSizeParam = req.query['page_size'] || 0;

  paypal.notification.webhookEvent.list({ page_size: pageSizeParam }, function (err, result) {
    if (err) {
      res.render('notifications/webhook_events', {
        title: 'Notification Webhook Events',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
      });
    } else {
      res.render('notifications/webhook_events', {
        title: 'Notification Webhook Events',
        error: {},
        data: {
          webhookEvents: result,
          webhookEventsStr: beautify(JSON.stringify(result), { indent_size: 2 })
        }
      });
    }
  });
});

router.get('/webhook_event_types', function(req, res, next) {
  paypal.notification.webhookEventType.list(function (err, result) {
    if (err) {
      res.render('notifications/webhook_event_types', {
        title: 'Notification Webhook Event Types',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
      });
    } else {
      res.render('notifications/webhook_event_types', {
        title: 'Notification Webhook Event Types',
        error: {},
        data: {
          webhookEventTypes: result,
          webhookEventTypesStr: beautify(JSON.stringify(result), { indent_size: 2 })
        }
      });
    }
  });
});

/*
 * ex) curl "http://localhost:3000/notifications/webhook/listener" -d "foo=bar"
 */
router.post('/webhook/listener', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  console.log(req.body.id);
  console.log(req.body.resource.id);
  res.send('OK');
});

/*
 * ex) curl "http://localhost:3000/notifications/ipn/listener" -d "foo=bar"
 */
router.post('/ipn/listener', function(req, res, next) {
  console.log(JSON.stringify(req.query));
  console.log(JSON.stringify(req.body));

  var settings = { 'allow_sandbox': true };

  ipn.verify(req.body, settings, function callback(err, msg) {
    if (err) {
      console.error(JSON.stringify(err));

    } else {
      console.log(JSON.stringify(msg));

      // Do stuff with original params here

      if (req.body.payment_status == 'Completed') {
        // Payment has been confirmed as completed
      }
    }

    res.send('OK');
  });
});


module.exports = router;

