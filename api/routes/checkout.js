const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { Router } = require('express');

const router = Router();

// Test route
router.post('/checkout', async (req, res) => {
  const lineItems = JSON.parse(req.body.items);
  const metadata = JSON.parse(req.body.metadata);
  const discounts = JSON.parse(req.body.discounts);
  const customer = await stripe.customers.create({
    email: metadata.email ? metadata.email : null,
  });
  const sessionParams = {
    // payment_method_types: ['card'],
    line_items         : lineItems,
    payment_intent_data: {
      metadata,
    },
    discounts,
    customer: customer.id,
    customer_update: {
      address: 'auto',
    },
    automatic_tax: {
      enabled: true,
    },
    mode       : 'payment',
    success_url: 'https://nilgiri-tea.net/payment/success',
    cancel_url : req.body.cancelUrl,
  };
  try {
    const session = await stripe.checkout.sessions.create(sessionParams);
    res.json({
      id: session.id,
      error: null,
    });
  } catch (e) {
    res.json({
      id: null,
      error: e,
    })
  }
});
// get
router.get('/checkout', (req, res) => {
  res.json({ id: '', text: 'checkout: this api can\'t be get.' });
});

module.exports = router;
