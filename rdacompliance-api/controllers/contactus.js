const mailer = require('../util/email/contactus-mailer.js');

function validateContactUsRouteRequest(name, email, phone, message, sendCopy) {
    const containsEmptyField = (name || email || phone || message || sendCopy) === '';
    const containsInvalidRegexForPhoneNumber = !/^\d{10}$/.test(phone);
    const containsInvalidRegexForEmail = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    const lengthOfMessageIsLessThan10 = message.length < 5;
    const lengthOfNameIsLessThan3 = name.length < 3;

    if (containsEmptyField || containsInvalidRegexForPhoneNumber
        || containsInvalidRegexForEmail || lengthOfMessageIsLessThan10
        || lengthOfNameIsLessThan3) {
        return false;
    }

    return true;
}

exports.contactus = async (req, res, next) => {
    try {
        const name = req.body.fullName;
        const email = req.body.emailAddress;
        const phone = req.body.phoneNumber;
        const message = req.body.message;
        const sendCopy = req.body.sendCopy;

        if (!validateContactUsRouteRequest(name, email, phone, message, sendCopy)) {
            return res.status(422).json({ message: 'Invalid form submission!' });
        }

        //if (process.env.NODE_ENV !== 'dev') {
            mailer.sendFormSubmission(name, email, phone, message);
            if (sendCopy) mailer.sendFormSubmissionCOPY(name, email, phone, message);
        //}

        res.status(201).json({ message: 'Contact us submission was successful!' });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}