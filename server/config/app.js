const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');

const schema = require('../schema/index');
const { requireAuth } = require('../middleware/authMiddleware');

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// enable cors
const corsOptions = {
  origin: 'localhost:3000',
  credentials: true // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));

//app.use(requireAuth);

app.use(process.env.GRAPHQL_ROUTE, graphqlHTTP(
  (req, res) =>
    ({
      schema: schema,
      context: { req, res },
      graphiql: true
    })
  )
);

console.log('Express app initialised!');

module.exports = app;