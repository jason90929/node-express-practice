const openAPI = require('express-openapi');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

const initialize = openAPI.initialize;

app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "http://localhost:3030/api-docs",
    },
  })
);

// OpenAPI routes
initialize({
  app,
  apiDoc: require('./doc/api-doc'),
  paths: './doc/paths',
});

app.listen(3030);

module.exports = app;
