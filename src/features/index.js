const app = require('express');
export const pdfRouter = app.Router();

const pdfHandler = async (req, res, next) => {
    import(__dirname + '/' + req.query.reportCode + '/handler.js').then((r) => {
        r.pdfHandler(req, res, next);
    })
}

pdfRouter.post('/', pdfHandler); 

module.exports = pdfRouter;

