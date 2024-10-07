import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import * as swaggerUi from 'swagger-ui-express';
import Mongo from './config/database';
import swaggerSpec from './config/swagger';
import logger from './utils/logger';

import { sendSuccessResponse } from './utils/response';

const app: express.Application = express();

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(helmet());
app.use(mongoSanitize());
app.use(
  cors({
    origin: process.env.ENV === 'development' ? '*' : process.env.WEB_URL,
  })
);

process.env.ENV === 'development' &&
  app.use(`/api/v1/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) =>
  sendSuccessResponse({
    statusCode: 200,
    message: 'Hello from server',
    res,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    logger.info(`Server is running on port ${PORT}`);
    await Mongo().connect();
  } catch (error) {
    throw new Error(error?.message || error);
  }
});

process.on('unhandledRejection', () => {
  process.exit(1);
});
