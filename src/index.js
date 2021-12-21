require('dotenv').config();
import { log } from './log';
const JSONbigString = require('json-bigint-x')({ storeAsString: true });

// import {renderTemplate, renderBufferTemplate, toPdf, toBufferPdf} from './report/report-util.js';
import { registerRoute } from './route'
const qrCode = require('qrcode');

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const handlebars = require('express-handlebars');

const puppeteer = require('puppeteer');
const util = require('util');
const chromeEval = require('chrome-page-eval')({ puppeteer });
const writeFileAsync = util.promisify(fs.writeFile);
const imageToBase64 = require('image-to-base64');
const Handlebars = require('handlebars');

var library     = require('@fortawesome/fontawesome-svg-core').library;
var dom         = require('@fortawesome/fontawesome-svg-core').dom;
var icon        = require('@fortawesome/fontawesome-svg-core').icon;
var fas         = require('@fortawesome/free-solid-svg-icons').fas;

// Adds all the icons from the Solid style into our library for easy lookup
library.add(fas)

Handlebars.registerHelper('offset', (index) => {
    return index + 1;
});

Handlebars.registerHelper('fontawesome-css', function () {
  return new Handlebars.SafeString(
    dom.css()
  )
})

Handlebars.registerHelper('fontawesome-icon', function (args) {
  return new Handlebars.SafeString(
    icon({ prefix: 'fas', iconName: args.hash.icon, size: 'fa-xs' }).html
  )
})

global.log = log


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with, authorization, Content-Type, Authorization, X-XSRF-TOKEN');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});




app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: 'public/templates',
    extname: 'hbs'
    }));

app.all('/images/*', (req, res, next) => {
    if(req.hostname === 'localhost' || req.hostname === '127.0.0.1') {
        next();
    } else {
        res.status(403).send({
            message: 'Access Forbidden'
        });
    }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('main', {layout : 'index'});
});

app.get('/test', (req, res) => {
    res.status(200).send("{\"status\" : \"abc...\"}");
});

const loadImageToBase64 = async () => {
    const result = [
        {
            base64Data: 'data:image/jpeg;base64, ' + await imageToBase64('public/images/1.jpg'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/jpeg;base64, ' + await imageToBase64('public/images/2.jpg'),
            imageName: 'Image 2'
        },
        {
            base64Data: 'data:image/jpeg;base64, ' + await imageToBase64('public/images/3.jpeg'),
            imageName: 'Image 3'
        },
        {
            base64Data: 'data:image/jpeg;base64, ' + await imageToBase64('public/images/4.jpg'),
            imageName: 'Image 4'
        },
        {
            base64Data: 'data:image/jpeg;base64, ' + await imageToBase64('public/images/5.jpg'),
            imageName: 'Image 5'
        },
        {
            base64Data: 'data:image/jpeg;base64, ' + await imageToBase64('public/images/6.jpg'),
            imageName: 'Image 6'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/1.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/2.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/3.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/1.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/4.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/5.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/6.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/7.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/8.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/9.png'),
            imageName: 'Image 1'
        },
        {
            base64Data: 'data:image/png;base64, ' + await imageToBase64('public/images/10.png'),
            imageName: 'Image 1'
        },
        // {
        //     base64Data: 'data:image/jpeg;base64, ' + await imageToBase64('public/images/large.jpg'),
        //     imageName: 'Large Image'
        // },
    ];

    return result;
}

export let PRIVATE_KEY;
export let PUBLIC_KEY;

class Server {
    constructor() {
        this.app = app
        PRIVATE_KEY = fs.readFileSync(path.join(__dirname, 'keys/app.rsa'));
        PUBLIC_KEY = fs.readFileSync(path.join(__dirname, 'keys/app.rsa.pub'));
    }

    init () {
        log.info('init');
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    registerRoute () {
        log.info('register route');
        registerRoute(this.app)
    }

    start () {
        const port = process.env.SERVER_PORT || 8080; 
        this.app.listen(port, () => log.info(`Server is running on port ${port}`));
    }
}



const main = () => {
    const server = new Server ();
    server.init();
    server.registerRoute();
    server.start();
}

main();

