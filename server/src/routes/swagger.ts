import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Auction system API',
      version: '1.0.0',
    },
  },
  apis: ['./dist/controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const router = Router();

router.get('', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;