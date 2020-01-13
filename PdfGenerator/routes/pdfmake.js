const express = require('express');
const router = express.Router();
const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');
pdfMake.vfs = vfsFonts.pdfMake.vfs;

router.post('/pdf', (req, res, next) => {
    //res.send('PDF');
    const fname = req.body.fname;
    const lname = req.body.lname;

    var documentDefinition = {
        content: [
            `Le ${fname} est l’opérateur de référence en Afrique de l’Ouest qui offre des solutions globales de télécommunications dans les domaines du fixe, du mobile, de l’Internet, de la télévision, du mobile money et des données au service des particuliers et des entreprises. Leader dans tous ses pays de présence, le Groupe Sonatel a démarré sa croissance externe au Mali en 2002, puis s’est successivement installé en Guinée et en Guinée Bissau en 2007 et tout dernièrement en Sierra Léone (2016).
            tout dernièrement en Sierra Léone (2016).
            Le Groupe Sonatel en chiffres (2018) :
            29,7 millions de clients
            5,6 millions d’abonnés actifs Orange Money
            1022 milliards de chiffre d’affaires
            5 pays de présence
            4500 salariés
            Engagement Social :
            Le Groupe Sonatel déploie dans tous ses pays de présence une politique de Responsabilité Sociale d’Entreprise (RSE) qui s’inscrit dans le prolongement du plan stratégique «Horizon 2020», et des orientations définies dans les documents cadres nationaux portant sur le Développement Durable. C’est le cas par exemple au Sénégal avec la Stratégie Numérique 2025.



            Le ${lname}

            `,
        ]
    };


    // `Hello ${fname} ${lname}` ,
    // 'Nice to meet you!'
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });
});


module.exports = router;