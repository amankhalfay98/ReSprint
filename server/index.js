const express = require('express');
const cors = require('cors');
require('dotenv').config();
const configRoutes = require('./routes');

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

configRoutes(app);
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Application running on port: ${port}`);
});
