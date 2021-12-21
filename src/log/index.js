export const isDevMode = (process.env.NODE_ENV || 'development') === 'development';

const opts = {
    errorEventName:'error',
    logDirectory:'logs',
    fileNamePattern:'app-<DATE>.log',
    dateFormat:'YYYY-MM-DD'
};
export const log = require('simple-node-logger').createSimpleLogger('app.log');
