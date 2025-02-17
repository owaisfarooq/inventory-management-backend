import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory Management API',
      version: '1.0.0',
      description: 'API documentation for Inventory Management System'
    },
    servers: [
      {
        url: process.env['NODE_ENV'] === 'production'
          ? 'https://your-production-url.com'
          : 'http://localhost:5000',
        description: process.env['NODE_ENV'] === 'production'
          ? 'Production Server'
          : 'Local Development Server'
      }
    ]
  },
  apis: [
    './src/routes/*.ts',
    './src/controllers/*.ts',
    './src/routes/BaseRoute.ts',
    './src/controllers/BaseController.ts'
  ]
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  console.log('Swagger initialized at /api-docs');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
