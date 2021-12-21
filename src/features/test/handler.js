import { renderPdf } from '../../lib/report';
import { genBarCodeAsBase64, genQrCodeAsBase64 } from '../../lib/code-generate';
const imageToBase64 = require('image-to-base64');

const fs = require('fs');

export const pdfHandler = async (req, res, next) => {
    const { id } = req.query;
    //TODO load from DB
    const reportTitle = 'PHIẾU CHỈ ĐỊNH';
    const start = new Date().getTime();
    try {
        const data = {
            id,
            reportId: 'DK21120185',
            reportTitle,
            patientId: '54N0200031',
            patientFullName: 'Nguyễn Thanh Hồng',
            patientAddress: 'Xã Phước Khánh, huyện Nhơn Trạch, tỉnh Đồng Nai, Việt Nam',
            patientReferredBy: 'BS.CKI Trương Quan',
            patientGender: 'Nam',
            patientDateOfBirth: 1954,
            examDate: '10/12/2021',
            doctorFullName: 'BS. CKI Trương Quan',
            companyName: 'TRUNG TÂM TIÊU HÓA VIỆT',
            companySlogan: 'DIGESTIVE & LIVER CENTER',
            companyPhoneNumber1: '(028) 3868 1568',
            companyPhoneNumber2: '(028) 3868 2568',
            companyLogoURL: '/public/images/logo.jpg',
            companyAddress: '9 Tô Hiến Thành, P.13, Q.10, TP HCM',
            companyWebSite: 'tieuhoaviet.vn',
            companyEmail: 'tieuhoaviet@gmail.com',
        services: [{
            id: '1121120017',
            renderCode: true,
            name: 'Chụp X-Quang Tim Phổi thẳng',
            doctor: 'LÊ QUANG KHANG',
            nurse: undefined,
        },{
            id: '1221120050',
            renderCode: true,
            name: 'Siêu âm bụng tổng quát',
            doctor: 'NGUYỄN QUANG THỊNH',
            nurse: undefined,
        },{
            id: '1111123',
            name: 'Glucose/máu (đói)',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'NGUYỄN THỊ THANH THANH',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        {
            id: '111112333',
            name: 'HbA1c',
            doctor: 'LÊ THỊ HOÀI VÂN',
            nurse: 'LƯU CẨM TÚ',
        },
        
    ]};
        await transform(data);
        const buffer = await renderPdf(false, undefined, 'src/features/test/templates', data, {printHead: true, marginTop: 280, landscape: false, savePdfFile: true, usedDefaultHeader: false, usedDefaultFooter: false, watermarkValue: 'Uncensored'}, "index")
        const end = new Date().getTime();
        console.log(end - start);
        res.contentType("application/pdf");
        res.send(buffer);
    } catch (err) {
        res.status(err.status || 500).send({
            error: {
              status: err.status || 500,
              message: err.message || err,
            },
        });
    }
}


const transform = async (data) => {
    data.companyLogo = 'data:image/jpeg;base64, ' + await imageToBase64('public/images/logo.jpg'),
    data.patientIdAsBarCode = genBarCodeAsBase64(data.patientId);
    data.patientIdAsQrCode = await genQrCodeAsBase64 (data.patientId);
    data.reportIdAsBarCode = genBarCodeAsBase64(data.reportId);
    data.services = await Promise.all(data.services.map(async (it) => {
        if(it.renderCode) {
            it.serviceIdAsBarCode = genBarCodeAsBase64(it.id);
            it.serviceIdAsQrCode = await genQrCodeAsBase64(it.id);
        }

        return it;
    }));
}