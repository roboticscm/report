import { isDevMode } from '../log/index';
import { PDFDocument } from 'pdf-lib'
const os = require('os');
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');


const renderHtml = (htmlTemplate, data) => {
    const compiledTemplate = hbs.compile(htmlTemplate);
    return compiledTemplate(data);
}
const renderFileTemplate = (templateFile, data) => {
    const templatePath = isDevMode ? templateFile : path.join(__dirname, templateFile);
    const html = fs.readFileSync(templatePath, {encoding: 'utf-8'});
    return renderHtml (html, data);
}

const renderDBTemplate = (templateCode, data) => {
    // TODO
}


const htmlToPdf = async (title, bodyTemplate, headTemplate, headerTemplate, footerTemplate, params, cssFile="index") => {
    const cssPath = isDevMode ? `public/css/${cssFile}.css` : path.join(__dirname, `public/css/${cssFile}.css`);
    params.pdfPath = '/Users/khai.lv/reports'
    params.savePdfFile = 'test.pdf';

    const css = fs.readFileSync(cssPath, {encoding: 'utf-8'});

    headerTemplate = '<style>' + css + '</style>' + headerTemplate;

    if (params && (params.savePdfFile || params.savePdfFile === undefined)) {
        if(params && !params.pdfPath) {
            params.pdfPath = path.join(os.homedir(), "reports");
        }

        try {
            if(!fs.existsSync(params.pdfPath)) {
                fs.mkdirSync(params.pdfPath);
            }
        } catch (err) {
            throw err
        }
    }
    

    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(bodyTemplate);
    await page.emulateMediaType('print');

    params.format = (params && params.format) || 'A4'

    if(params && params.watermarkValue) {
        await page.evaluate((params) => {          
            if(params && params.landscape) {
                document.body.style = `background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1'  transform='rotate(-25 0 0)' height='270px' width='900px'><text x='380' y='210' opacity='0.3' fill='gray' font-size='80'>${params.watermarkValue}</text></svg>");`
            } else {
                document.body.style = `background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1'  transform='rotate(-25 0 0)' height='270px' width='700px'><text x='180' y='210' opacity='0.3' fill='gray' font-size='80'>${params.watermarkValue}</text></svg>");`
            }
            
        }, params);
    }
    

    await page.addStyleTag({path: cssPath});

    let config = {
        format: params.format,
        landscape: (params && params.landscape) || false,
        displayHeaderFooter: (params && params.showHeaderFooter) || true,
        printBackground: true,
        margin: {
            top: (params && params.marginTop ) || '60px',
            bottom: (params && params.marginBottom ) || '60px',
            left: (params && params.marginLeft ) || '60px',
            right: (params && params.marginRight ) || '30px'
        },
        headerTemplate,
        footerTemplate
    }

    if (!headerTemplate) {
        config = {...config, headerTemplate: '<span></span>'}
    } else {
        if (params && (params.printHead !== false)) {
            config = {...config, headerTemplate: headerTemplate.replace('[[HEAD]]', headTemplate)}
        } else {
            config = {...config, headerTemplate: headerTemplate.replace('[[HEAD]]', '')}
        }
        
    } 

    if (!footerTemplate) {
        config = {...config, footerTemplate: '<span></span>'}
    }

    if (params && params.pdfPath && params.printHead !== false) {
        config = {...config, path: path.join(params.pdfPath, params.savePdfFile)}
    }

    const buffer = await page.pdf(config);
    
    const pdfDoc = await PDFDocument.load(buffer);

    pdfDoc.setAuthor((params && params.author) || 'Unkown')
    pdfDoc.setTitle(title || 'Untitled');

    const pdfBytes = await pdfDoc.save();

    // Generate head and save to pdf file
    if (params && (params.printHead === false)) { 
        config = {...config, headerTemplate: headerTemplate.replace('[[HEAD]]', headTemplate)}
        config = {...config, path: path.join(params.pdfPath, params.savePdfFile)}
        const buffer = await page.pdf(config);
    
        const pdfDoc = await PDFDocument.load(buffer);

        pdfDoc.setAuthor((params && params.author) || 'Unkown')
        pdfDoc.setTitle(title || 'Untitled');
        await pdfDoc.save();
    } 

    await browser.close();
    return Buffer.from(pdfBytes);
    
}

/**
 * 
 * @param {*} isDbTemplate, isDbTemplate = true, template is loaded from db, other wise from file
 * @param {*} templateCode, templateCode is used when isDbTemplate = true
 * @param {*} templatePath, templatePath is used when isDbTemplate = false
 * @param {*} data, data for filling template 
 * @param {*} params, params is an object
 * params: {
 *  showHeaderFooter: boolean (default: true)
 *  usedDefaultHeader: boolean (default: true)
 *  usedDefaultFooter: boolean (default: true)
 *  watermarkValue: string (default: undefined)
 *  showHeader: boolean (default: true)
 *  savePdfFile: boolean (default: true)
 *  pdfPath: string (if pdfPath is empty, ~/reports dir is used)
 *  pdfFile: string (if pdfFile is empty, a random filename is generated)
 *  landscape: boolean (default: false)
 *  format: string (default: A4, other value: A0, A1, ...)
 *  marginLeft: string (default: 20px)
 *  marginRight: string (default: 20px)
 *  marginTop: string (default: 50px)
 *  marginBottom: string (default: 50px)
 *  theme: string (default: STANDARD, other value: TODO)
 *  author: string (default: Unkown)
 * }
 */
export const renderPdf = async (isDbTemplate, templateCode, templatePath, data, params, cssFile = "index") => {
    let bodyTemplate, headTemplate,  headerTemplate, footerTemplate, css;
    let title = 'Untitled';

    if(isDbTemplate) {
        // TODO
        title = 'Title from DB';
    } else {
        bodyTemplate = renderFileTemplate(path.join(templatePath, 'body.hbs'), data)
        if(params && (params.usedDefaultHeader || params.usedDefaultHeader === undefined)) {
            if (isDevMode) {
                headerTemplate = renderFileTemplate('public/templates/header.hbs', data)
            } else {
                headerTemplate = renderFileTemplate(path.join(__dirname, 'public/templates/header.hbs'), data)
            }
        } else if (fs.existsSync(path.join(templatePath, 'header.hbs'))) {
            headerTemplate = renderFileTemplate(path.join(templatePath, 'header.hbs'), data)
        }

        if(params && (params.usedDefaultHead || params.usedDefaultHead === undefined)) {
            if (isDevMode) {
                headTemplate = renderFileTemplate('public/templates/head.hbs', data)
            } else {
                headTemplate = renderFileTemplate(path.join(__dirname, 'public/templates/head.hbs'), data)
            }
        } else if (fs.existsSync(path.join(templatePath, 'head.hbs'))) {
            headTemplate = renderFileTemplate(path.join(templatePath, 'head.hbs'), data)
        }
        
        if(params && (params.usedDefaultFooter || params.usedDefaultFooter === undefined)) {
            if (isDevMode) {
                footerTemplate = renderFileTemplate('public/templates/footer.hbs', data)
            } else {
                footerTemplate = renderFileTemplate(path.join(__dirname, 'public/templates/footer.hbs'), data)
            }
        } else if (fs.existsSync(path.join(templatePath, 'footer.hbs'))) {
            footerTemplate = renderFileTemplate(path.join(templatePath, 'footer.hbs'), data)
        }
    }

    return htmlToPdf(title, bodyTemplate, headTemplate, headerTemplate, footerTemplate, params, cssFile);
}