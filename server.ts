import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/db';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';
import apiRouter from './routes/price';
import RydeuValidationError, { ApiCodes } from './model/apiModel/ApiCode';
import { createResponse } from './utils/apiUtils';

const API_PREFIX = '/api';
const PORT: number = parseInt(process.env.PORT || '3001');

dotenv.config();

connectDB();

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(`${API_PREFIX}`, apiRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    data: 'Invalid API endpoint',
  });
});

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    return next();
  }
  if (err instanceof SyntaxError && 'body' in err) {
    return res
      .status(ApiCodes.INVALID_JSON_FORMAT.statusCode)
      .json(createResponse({}, ApiCodes.INVALID_JSON_FORMAT));
  } else if (err instanceof RydeuValidationError) {
    return res
      .status(err.apiCode.statusCode)
      .json(createResponse({}, err.apiCode));
  } else {
    return res
      .status(ApiCodes.INTERNAL_SERVER_ERROR.statusCode)
      .json(createResponse({}, ApiCodes.INTERNAL_SERVER_ERROR));
  }
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Listening at PORT ${PORT}`);
});
