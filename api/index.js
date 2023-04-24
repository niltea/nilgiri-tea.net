import bodyParser from 'body-parser';
const express = require('express');

// Create express instance
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Require API routes
const checkout = require('./routes/checkout');
const mailer = require('./routes/mailer');

// Import API Routes
app.use(checkout);
app.use(mailer);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
