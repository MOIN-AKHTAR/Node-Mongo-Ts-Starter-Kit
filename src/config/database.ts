import mongoose from 'mongoose';
import logger from '../utils/logger';

const Mongo = () => {
  const connect = async () => {
    try {
      mongoose.set('debug', process.env.ENV === 'development');
      mongoose.connection
        .on('error', () => logger.error('Error while connecting database'))
        .on('open', () => {
          logger.info('Database connection open');
        })
        .on('connected', () => {
          logger.verbose('Database connected successfully');
        })
        .on('timeout', () => {
          logger.warn('Database connection timeout');
        })
        .on('close', () => {
          logger.error('Database connection closed');
        })
        .on('reconnectFailed', () => {
          logger.warn('Database reconnection failed');
        })
        .on('disconnected', () => {
          logger.error('Database disconnected');
        });
      await mongoose.connect(`${process.env.MONGO_DB_URL}`);
    } catch (error) {
      throw new Error(error);
    }
  };

  const disconnect = async () => {
    await mongoose.connection.close();
  };
  return { connect, disconnect };
};

export default Mongo;
