const express = require('express');
const router = express.Router();
const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');
pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf', (req, res, next) => {
    //res.send('PDF');
    const contents = req.body.content;
    var documentDefinition = {
        content: [
            `LOrem upsum`
        ]
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="ProtoboxFile.pdf"'
        });
        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });
});


module.exports = router;