const QrCode = require('qrcode');
const { createCanvas } = require("canvas");
const JsBarcode = require('jsbarcode');
const canvas = createCanvas();

export const genQrCodeAsBase64 = async (text, opts) => {
    return await QrCode.toDataURL(text, {margin: (opts && opts.margin) || 1});
}

export const genBarCodeAsBase64 = (text, opts) => {
    JsBarcode(canvas, text, {margin: (opts && opts.margin) || 1, format: (opts && opts.format) || "CODE128", height: (opts && opts.height) || 30, width: (opts && opts.width) || 1, displayValue: (opts && opts.displayValue) || false});
   return canvas.toDataURL("image/png");
}

