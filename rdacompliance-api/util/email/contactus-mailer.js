const nodemailer = require('nodemailer');
const iso_dompurify = require('isomorphic-dompurify');
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
    tls: {
      rejectUnauthorized: false,
    },
});

module.exports =
{
    sendFormSubmission(fullName, emailAddress, phoneNumber, message) {
        let cleanedFullName = iso_dompurify.sanitize(fullName);
        let cleanedEmailAddress = iso_dompurify.sanitize(emailAddress);
        let cleanedPhoneNumber = iso_dompurify.sanitize(phoneNumber);
        let cleanedMessage = iso_dompurify.sanitize(message);
        let contactusHB = fs.readFileSync(path.join(__dirname, 'views', 'contactus.hbs'), 'utf8');
        let contactusTemplate = hbs.compile(contactusHB);

        let mailOptions = {
            from: global.env.SERVER_EMAIL_ADDRESS,
            to: global.env.EMAIL_FOR_RESPONSES,
            subject: 'SafeServe Metro - Contact Us Form Submission',
            html: contactusTemplate({ fullName: cleanedFullName, emailAddress: cleanedEmailAddress, phoneNumber: cleanedPhoneNumber, message: cleanedMessage })
        };


        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
        });
    },

    sendFormSubmissionCOPY(fullName, emailAddress, phoneNumber, message) {
        let cleanedFullName = iso_dompurify.sanitize(fullName);
        let cleanedEmailAddress = iso_dompurify.sanitize(emailAddress);
        let cleanedPhoneNumber = iso_dompurify.sanitize(phoneNumber);
        let cleanedMessage = iso_dompurify.sanitize(message);
        let contactusCopyHB = fs.readFileSync(path.join(__dirname, 'views', 'contactus-sendcopy.hbs'), 'utf8');
        let contactusCopyTemplate = hbs.compile(contactusCopyHB);

        let mailOptions = {
            from: global.env.SERVER_EMAIL_ADDRESS,
            to: cleanedEmailAddress,
            subject: 'SafeServe Metro - Contact Us Form Submission Copy Request',
            html: contactusCopyTemplate({ fullName: cleanedFullName, emailAddress: cleanedEmailAddress, phoneNumber: cleanedPhoneNumber, message: cleanedMessage })
        };

        smtpTransport.sendMail(mailOptions, (error, info) => {
            if (error) return console.log(error);
        });
    }
}