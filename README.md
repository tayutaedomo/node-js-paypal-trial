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


# Operation
## Confirm Configuration
Access [http://localhost:3000/subscriptions](http://localhost:3000/subscriptions) on your browser.
If display your API token, configuration is OK.

## Subscribe
### Create a new billing plan
Access [http://localhost:3000/subscriptions/plan](http://localhost:3000/subscriptions/plan) on your browser.
Set some parameters, and then submit.
If succeeded, you can get plan id string.

### Activate billing plan
Access [http://localhost:3000/subscriptions/plan_activation](http://localhost:3000/subscriptions/plan_activation) on your browser.
Set your created plan id, and then submit.

### Create a new billing agreement
Access [http://localhost:3000/subscriptions/agreement](http://localhost:3000/subscriptions/agreement) on your browser.
Set your agreement id and some parameters, and then submit.
If succeeded, you can get a approval url like 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-62016054V8774611A'.

### Approve billing
Access the approval url on your browser, and then approve the billing on PayPal.
You get callback of success or cancel.


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

