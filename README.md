# node-js-paypal-trial
Try PayPal API on Node.js

- Subscription
- Invoice
- Reference Transaction
- Adaptive Payments


# Prepare
You should get the PayPal sandbox information. See following:
- [https://developer.paypal.com/docs/classic/lifecycle/ug_sandbox](https://developer.paypal.com/docs/classic/lifecycle/ug_sandbox)

You have to get a permission to use the Reference Transaction on sandbox.
If you don't have it yet, you should request to PayPal technical support.
- [https://jp.paypal-techsupport.com/](https://jp.paypal-techsupport.com/)


# Setup on your local
Install node-dev if you need.
```
$ npm install -g node-dev
```

Set environment variables.  
If you use for production, you should set `PAYPAL_MODE=live`.
```
export PAYPAL_MODE=sandbox
export PAYPAL_CLIENT_ID=<your client id>
export PAYPAL_CLIENT_SECRET=<your client secret>
export PAYPAL_USER=<your user id for NVP API>
export PAYPAL_PWD=<your password for NVP API>
export PAYPAL_SIGNATURE=<your signature for NVP API>
```

git clone and start app.
```
$ git clone git@github.com:tayutaedomo/node-js-paypal-trial.git
$ npm install
$ bin/www
```
Your app should now be running on http://localhost:3000.


# Operation
## Subscribe
## Confirm Configuration
Access [http://localhost:3000/subscriptions](http://localhost:3000/subscriptions) on your browser.
If display your API token, configuration is OK.


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
If you get success, copy token.

### Execute billing agreement
Access [http://localhost:3000/subscriptions/agreement_execution](http://localhost:3000/subscriptions/agreement_execution) on your browser.
Set the token, and then submit.


## Invoice 
Access [http://localhost:3000/invoices/create](http://localhost:3000/invoices/create) on your browser.
Set some parameters, and then submit.
If succeeded, you can get invoice id string.


## Reference Transaction
### SetExpressCheckout
Access [http://localhost:3000/checkout](http://localhost:3000/checkout) on your browser.

![checkout 1](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_checkout_1.png)

![checkout 2](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_checkout_2.png)


### Callback from PayPal
![checkout 3](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_checkout_3.png)


### CreateBillingAgreement
Access [http://localhost:3000/agreement](http://localhost:3000/agreement) on your browser.

![agreement 1](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_agreement_1.png)

![agreement 2](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_agreement_2.png)


### DoReferenceTransaction
Access [http://localhost:3000/transaction](http://localhost:3000/transaction) on your browser.

![transaction 1](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_transaction_1.png)

![transaction 2](https://raw.githubusercontent.com/tayutaedomo/node-paypal-reference-transaction/images/public/images/2016-06-08_capture_transaction_2.png)


## Adaptive Payments
WIP


# References
- Overview
  - https://developer.paypal.com/docs/integration/direct/rest-payments-overview/

- Billing Plans and Agreements
  - https://developer.paypal.com/docs/integration/direct/create-billing-plan/
  - https://developer.paypal.com/docs/integration/direct/create-billing-agreement/

- Invoice
  - https://developer.paypal.com/docs/integration/direct/invoicing/

- Reference Transaction?
  - English: [https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECReferenceTxns/](https://developer.paypal.com/docs/classic/express-checkout/integration-guide/ECReferenceTxns/)
  - Japanese: [pp_expresscheckout_advancedfeaturesguide_jp.pdf](https://www.paypalobjects.com/webstatic/ja_JP/developer/docs/pdf/pp_expresscheckout_advancedfeaturesguide_jp.pdf)


## Leaning the Subscription billing from subscription button
- https://www.paypal.com/webapps/mpp/get-started/subscription-button


## How to use express-checkout
- https://developer.paypal.com/docs/classic/express-checkout/ht_ec-refTrans-SetEC-DoRefTrans-curl-etc/


## API Docs
- Billing Plan & Agreement
  - https://developer.paypal.com/docs/api/#billing-plans-and-agreements
  - https://developer.paypal.com/docs/rest/api/payments.billing-plans/

- Invoice
  - https://developer.paypal.com/docs/api/invoicing/

- SetExpressCheckout
  - https://developer.paypal.com/docs/classic/api/merchant/SetExpressCheckout_API_Operation_NVP/

- CreateBillingAgreement
  - https://developer.paypal.com/docs/classic/api/merchant/CreateBillingAgreement_API_Operation_NVP/

- DoReferenceTransaction
  - https://developer.paypal.com/docs/classic/api/merchant/DoReferenceTransaction_API_Operation_NVP/

