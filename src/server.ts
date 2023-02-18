import express from 'express';
import payload from 'payload';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const username = encodeURIComponent(process.env.DATABASE_USERNAME)
const password = encodeURIComponent(process.env.DATABASE_PASSWORD)
const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: `mongodb+srv://${username}:${password}@cms.pbumxz0.mongodb.net/?retryWrites=true&w=majority`,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000);
}

start();
