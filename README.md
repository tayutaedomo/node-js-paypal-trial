# node-paypal-subscription
Try PayPal subscription on Node.js

# Setup on your local
Install node-dev.
```
$ npm install -g node-dev
```

Get PayPal sandbox information. See following:
- https://developer.paypal.com/docs/classic/lifecycle/ug_sandbox/

Set environment variables.
```
export PAYPAL_MODE=sandbox
export PAYPAL_CLIENT_ID=<your client id>
export PAYPAL_CLIENT_SECRET=<your client secret>
```

git clone and start app.
```
$ git clone git@github.com:tayutaedomo/node-paypal-subscription.git
$ npm install
$ bin/www
```
Your app should now be running on http://localhost:3000.


# References
- Overview
  - https://developer.paypal.com/docs/integration/direct/rest-payments-overview/

- Billing Plans and Agreements
  - https://developer.paypal.com/docs/integration/direct/create-billing-plan/
  - https://developer.paypal.com/docs/integration/direct/create-billing-agreement/

## API
- Docs
  - https://developer.paypal.com/docs/api/#billing-plans-and-agreements
  - https://developer.paypal.com/docs/rest/api/payments.billing-plans/

## Leaning the Subscription billing from subscription button
- https://www.paypal.com/webapps/mpp/get-started/subscription-button

