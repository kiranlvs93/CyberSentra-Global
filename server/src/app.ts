import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { config } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import apiRouter from './routes';

export const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    origin: config.frontendOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(morgan('combined'));

app.get('/healthz', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRouter);

app.use(errorHandler);
