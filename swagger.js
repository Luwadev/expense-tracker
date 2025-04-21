import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Expense Tracker API',
        version: '1.0.0',
      },
    },
    apis: ['./routes/*.js'], // Path to your API docs
  };

  const specs = swaggerJsdoc(options);

  module.exports = { swaggerUi, specs };
