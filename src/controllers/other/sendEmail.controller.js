const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');
const { readFile } = require('fs/promises');

module.exports = async (req, res) => {
    try {
        const { newsletterEmail } = req.body;
        const htmlTemplate = await readFile(path.join(__dirname, '../../views/other/emailTemplate.ejs'), 'utf-8');
        const logo = path.join(__dirname, "../../../public/images/icon/logo.png")
    
        if (newsletterEmail && process.env.GMAIL_USER && process.env.APP_PASSWORD) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                service: 'gmail',
                auth: {
                    type: 'login',
                    user: process.env.GMAIL_USER,
                    pass: process.env.APP_PASSWORD,
                },
            });

            await transporter.sendMail({
                rom: {
                    name: "Dokyshop",
                    addres: process.env.GMAIL_USER
                },
                to: newsletterEmail,
                subject: "¡Bienvenid@ a Dokyshop!",
                html: htmlTemplate,
                attachments: [{
                    filename: "logo.png",
                    path: logo,
                    cid: 'logo@dokyshop.com'
                }]
            });
        }

        return res.redirect('/')
    } catch (error) {
        res.send(error.message)
    }
};