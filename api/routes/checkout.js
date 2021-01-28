const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { Router } = require('express');

const router = Router();

// Test route
router.post('/checkout', async (req, res) => {
  const lineItems = JSON.parse(req.body.items);
  const metadata = JSON.parse(req.body.metadata);
  const sessionParams = {
    payment_method_types: ['card'],
    line_items          : lineItems,
    payment_intent_data : {
      metadata,
    },
    mode       : 'payment',
    success_url: 'https://nilgiri-tea.net/payment/success',
    cancel_url : 'https://nilgiri-tea.net/payment',
  };
  if (metadata.email) {
    sessionParams.customer_email = metadata.email;
  }
  const session = await stripe.checkout.sessions.create(sessionParams);
  res.json({ id: session.id });
});
// get
router.get('/checkout', async (req, res) => {
  res.json({ id: '', text: 'can\'t get this api' });
});

module.exports = router;
