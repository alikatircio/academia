import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./design/openapi.yaml');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

import userRoutes from '../routes/userRoutes';
app.use('/users', userRoutes); // POST /users

app.listen(3000, () => {
  console.log('API http://localhost:3000');
  console.log('Swagger UI http://localhost:3000/docs');
});
