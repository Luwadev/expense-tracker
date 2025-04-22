import express from 'express';
// import { swaggerUi, specs } from './swagger.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());

app.use(express.json());



// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Your routes go here
app.use('/api/auth/', userRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
