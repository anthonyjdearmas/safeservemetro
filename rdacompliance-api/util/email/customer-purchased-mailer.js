const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const hbs = require('handlebars');
const fs = require('fs');
const path = require('path');
global.env =  require('secure-env')({secret:'ccc123'});

var smtpTransport = nodemailer.createTransport({
    name: global.env.SERVER_NAME_SERVICE,
    host: global.env.SERVER_EMAIL_SERVICE,
    port: global.env.SERVER_EMAIL_PORT,
    secure: true,
    auth: {
        user: global.env.SERVER_EMAIL_ADDRESS,
        pass: global.env.SERVER_EMAIL_PASSWORD
    },
    tls:{
        rejectUnAuthorized:true
    }
});

module.exports =
{
    sendCustomerConfirmation(accDetails) {
        let purchaseConfirmationHB = fs.readFileSync(path.join(__dirname, 'views', 'customer-confirmation.hbs'), 'utf8');
        let purchaseConfirmationTemplate = hbs.compile(purchaseConfirmationHB);

        let mailOptions = {
            from: global.env.SERVER_EMAIL_ADDRESS,
            to: accDetails.customerEmail,
            subject: 'SafeServe Metro - Purchase Confirmation',
            html: purchaseConfirmationTemplate(accDetails)
        };


        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
        });
    },

    sendGeneratedAccessCodes(accDetails) {
        let accountcreationHB = fs.readFileSync(path.join(__dirname, 'views', 'account-creation-details.hbs'), 'utf8');
        let accountcreationTemplate = hbs.compile(accountcreationHB);

        let mailOptions = {
            from: global.env.SERVER_EMAIL_ADDRESS,
            to: global.env.EMAIL_FOR_RESPONSES,
            subject: 'SafeServe Metro - Purchase Completed',
            html: accountcreationTemplate(accDetails)
        };


        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
        });
    }
}