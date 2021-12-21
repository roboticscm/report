import { pdfRouter } from '../features/index';

const path = require('path');

export const registerRoute = (app) => {
    app.use('/report/pdf', pdfRouter); 
    log.info('registered: /report/pdf');
}
