const stripe = require('stripe')(process.env.STRIPE_SECRET);
const { Router } = require('express');

const router = Router();

// Test route
router.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items          : JSON.parse(req.body.items),
    mode                : 'payment',
    success_url         : 'https://nilgiri-tea.net/payment/success',
    cancel_url          : 'https://nilgiri-tea.net/payment',
  });

  res.json({ id: session.id });
});
// get
router.get('/checkout', async (req, res) => {
  res.json({ id: '', text: 'can\'t get this api' });
});

module.exports = router;
