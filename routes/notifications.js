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
  var pageSizeParam = req.query['page_size'] || 'created';

  paypal.notification.webhookEvent.list({ page_size: 0 }, function (err, result) {
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


module.exports = router;

