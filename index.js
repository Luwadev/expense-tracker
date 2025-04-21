import express from 'express';
import { swaggerUi, specs } from './swagger.js';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Your routes go here

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
