import express from 'express';
import cors from 'cors';
import { config } from './configs/config';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import router from './routes/index.route';
import swaggerUi from 'swagger-ui-express';
import { specs } from './configs/swagger';

const app = express();

app.use(helmet());
app.use(cors({
      origin: config.CORS_ORIGIN,
      credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
});
app.use('/api', limiter);


app.use(compression());
app.use(morgan(config.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Node.js Backend API Documentation',
}));

// Routes
app.use('/api/v1', router);
// // Error handling
// app.use('*', notFound);
// app.use(errorHandler);

export default app;