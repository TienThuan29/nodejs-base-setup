import app from './app';
import { config } from './configs/config';
import { connectDatabase } from './configs/database';


const startServer = async (): Promise<void> => {
      try {
            await connectDatabase();

            const server = app.listen(config.PORT, () => {
                  console.log(`Server is running in ${config.NODE_ENV} mode on port ${config.PORT}`);
            });

            // Graceful shutdown
            const gracefulShutdown = (signal: string) => {
                  console.log(`Received ${signal}. Starting graceful shutdown...`);
                  server.close(() => {
                        console.log('Server closed');
                        process.exit(0);
                  });
            };

            process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
            process.on('SIGINT', () => gracefulShutdown('SIGINT'));
      }
      catch(error) {
            console.error('Failed to start server:', error);
            process.exit(1);
      }
}

startServer();
