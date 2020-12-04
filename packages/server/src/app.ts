import express, { Request, Response, NextFunction, Application } from 'express';

import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import userRoutes from '@users/routes';
import podcastRoutes from '@podcasts/routes';
import episodeRoutes from '@episodes/routes';
import errorHandler from '@customMiddleware/errorHandler';

const app: Application = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/images', express.static('./images'));

app.use(userRoutes);
app.use(podcastRoutes);
app.use(episodeRoutes);
app.use(errorHandler);

export default app;
