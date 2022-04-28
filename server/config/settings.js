require('dotenv').config();

module.exports = {
  mongoConfig: {
    serverUrl: `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASSWORD}@cluster0.iqn5a.mongodb.net/test`,
    database: 'resprint',
  },
};
