const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const { readFile } = require('fs/promises');

module.exports = async (req, res) => {
    try {
        const { newsletterEmail } = req.body;
        const htmlTemplate = await readFile(path.join(__dirname, '../../views/other/emailTemplate.ejs'), 'utf-8');
        const logo = path.join(__dirname, "../../../public/images/icon/logo.png");

        if (newsletterEmail) {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.ethereal.email',
                port: process.env.SMTP_PORT || 587,
                auth: {
                    user: process.env.EMAIL_USER || 'kelly.quitzon@ethereal.email',
                    pass: process.env.EMAIL_PASS || '5VAGjxBxJWtTtdNA9r',
                },
                secure: false,
            });

            transporter.sendMail({
                from: {
                    name: "Dokyshop",
                    address: process.env.EMAIL_USER || 'kelly.quitzon@ethereal.email',
                },
                to: newsletterEmail,
                subject: "¡Bienvenid@ a Dokyshop!",
                html: htmlTemplate,
                attachments: [{
                    filename: "logo.png",
                    path: logo,
                    cid: 'logo@dokyshop.com'
                }]
            }, (err) => {
                if (err) {
                    console.error("Error al enviar el correo:", err);
                    return res.redirect('/');
                }

                console.log("Correo enviado");
                return res.redirect('/');
            });
        } else {
            return res.redirect('/');
        }
    } catch (error) {
        console.error("Error en el procesamiento:", error);
        res.redirect('/');
    }
};
