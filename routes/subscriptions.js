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

router.get('/plans', function(req, res, next) {
  var statusParam = req.query['status'] || 'created';

  paypal.billingPlan.list({ status: statusParam }, function (err, result) {
    if (err) {
      res.render('subscriptions/plans', {
        title: 'Subscription Plans',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
        billingPlan: {}
      });
    } else {
      res.render('subscriptions/plans', {
        title: 'Subscription Plans',
        error: {},
        data: { plans: result, plansStr: beautify(JSON.stringify(result), { indent_size: 2 }) }
      });
    }
  });
});

router.get('/plan', function(req, res, next) {
  res.render('subscriptions/plan', {
    title: 'Subscription Plan Creation',
    error: {},
    billingPlan: {}
  });
});

router.post('/plan', function(req, res, next) {
  var billingPlanAttributes = createBillingPlanAttributesFrom(req);

  paypal.billingPlan.create(billingPlanAttributes, function (err, billingPlan) {
    if (err) {
      res.render('subscriptions/plan', {
        title: 'Subscription Plan Creation Failed',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
        billingPlan: {}
      });
    } else {
      res.render('subscriptions/plan', {
        title: 'Subscription Plan Created',
        error: {},
        billingPlan: billingPlan,
        billingPlanStr: beautify(JSON.stringify(billingPlan), { indent_size: 2 })
      });
    }
  });
});

function createBillingPlanAttributesFrom(req) {
  return {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    payment_definitions: [
      {
        name: req.body.pd_name,
        type: req.body.pd_type,
        frequency_interval: req.body.pd_frequency_interval,
        frequency: req.body.pd_frequency,
        cycles: req.body.pd_cycles,
        amount: {
          currency: req.body.pd_currency,
          value: req.body.pd_amount
        }
      },
    ],
    merchant_preferences: {
      cancel_url: req.body.mp_cancel_url,
      return_url: req.body.mp_return_url,
      auto_bill_amount: req.body.mp_auto_bill_amount,
      initial_fail_amount_action: req.body.mp_initial_fail_amount_action
    }
  };
}

router.get('/plan_activation', function(req, res, next) {
  res.render('subscriptions/plan_activation', {
    title: 'Subscription Plan Activation',
    error: {},
    result: {}
  });
});

router.post('/plan_activation', function(req, res, next) {
  paypal.billingPlan.activate(req.body.plan_id, function (err, result) {
    if (err) {
      res.render('subscriptions/plan_activation', {
        title: 'Subscription Plan Activation Failed',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
        result: {}
      });
    } else {
      res.render('subscriptions/plan_activation', {
        title: 'Subscription Plan Activated',
        error: {},
        result: result,
        resultStr: beautify(JSON.stringify(result), { indent_size: 2 })
      });
    }
  });
});

router.get('/agreement', function(req, res, next) {
  res.render('subscriptions/agreement', {
    title: 'Subscription Agreement Creation',
    error: {},
    billingAgreement: {}
  });
});

router.post('/agreement', function(req, res, next) {
  var billingAgreementAttributes = createBillingAgreementAttributes(req);

  paypal.billingAgreement.create(billingAgreementAttributes, function (err, billingAgreement) {
    if (err) {
      res.render('subscriptions/agreement', {
        title: 'Subscription Agreement Creation Failed',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
        billingAgreement: {}
      });
    } else {
      res.render('subscriptions/agreement', {
        title: 'Subscription Agreement Created',
        error: {},
        billingAgreement: billingAgreement,
        billingAgreementStr: beautify(JSON.stringify(billingAgreement), { indent_size: 2 })
      });
    }
  });
});

function createBillingAgreementAttributes(req) {
  return {
    name: req.body.name,
    description: req.body.description,
    start_date: req.body.start_date,
    payer: {
      payment_method: req.body.payment_method
    },
    plan: {
      id: req.body.plan_id
    }
  };
}

router.get('/callback/success', function(req, res, next) {
  res.render('subscriptions/callback/success', {
    title: 'Subscription Success Callback',
    data: { token: req.query.token }
  });
});

router.get('/callback/cancel', function(req, res, next) {
  res.render('subscriptions/callback/cancel', {
    title: 'Subscription Cancel Callback',
    data: { token: req.query.token }
  });
});

router.get('/agreement_execution', function(req, res, next) {
  res.render('subscriptions/agreement_execution', {
    title: 'Subscription Agreement Execution',
    error: {},
    result: {}
  });
});

router.post('/agreement_execution', function(req, res, next) {
  paypal.billingAgreement.execute(req.body.token, function (err, result) {
    if (err) {
      res.render('subscriptions/agreement_execution', {
        title: 'Subscription Agreement Execution Failed',
        error: err,
        errorStr: beautify(JSON.stringify(err), { indent_size: 2 }),
        result: {}
      });
    } else {
      res.render('subscriptions/agreement_execution', {
        title: 'Subscription Agreement Executed',
        error: {},
        result: result,
        resultStr: beautify(JSON.stringify(result), { indent_size: 2 })
      });
    }
  });
});


module.exports = router;

