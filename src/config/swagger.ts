import swaggerJSDoc, { SwaggerDefinition, Options } from 'swagger-jsdoc';
import path from 'path';

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: `AI HeadShot`,
    version: `3.0`,
    description: `Swagger - A sample doc for all apis for ai-headshot`,
  },
};

const options: Options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '..', 'api-swagger.yaml')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
