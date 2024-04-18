import { devLogger, prodLogger } from '../config/logger.config.js';
import config from '../config/config.js';

export const addLogger = (req, res, next) => {
  if (req.originalUrl === '/loggerTest') {
    if (config.enviroment === 'DEV') {
      req.logger = devLogger;
      req.logger.debug(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.http(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.info(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.warning(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.error(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.fatal(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    
    } else {
      req.logger = prodLogger;
      req.logger.info(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.warning(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.error(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
      req.logger.fatal(`${req.method} on ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`);
    }
    next();
  } else {
    next('route');
  }
}
