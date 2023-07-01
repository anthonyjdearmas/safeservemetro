const User = require('../models/user');
const mailer = require('../util/email/customer-purchased-mailer.js');

function generateRandomAccessCode() {
    const accessCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return accessCode;
}

function calculateExpirationDate() {
    const createdAtDateObj = new Date();
    // Note: Expiration date is 1 year from the date of creation
    return new Date(createdAtDateObj.setFullYear(createdAtDateObj.getFullYear() + 1));
}

exports.generateAccountData = async (parsedData) => {
    let detailsForEmail = {};
    const associatedEmail = parsedData.customerEmail;

    detailsForEmail.packagePurchased = parsedData.packagePurchased;
    detailsForEmail.accessCodes = [];
    detailsForEmail.customerEmail = associatedEmail;

    for (let i = 0; i < parsedData.amountOfAccounts; i++) {
        const generatedAccessCode = generateRandomAccessCode();
        const expirationDate = calculateExpirationDate();
        const user = new User(generatedAccessCode, expirationDate, associatedEmail);
        await User.save(user);

        detailsForEmail.accessCodes.push(
            {accessCode: generatedAccessCode, expirationDate: expirationDate.toISOString().split('T')[0]}
        );
    }

    mailer.sendCustomerConfirmation(detailsForEmail);
    mailer.sendGeneratedAccessCodes(detailsForEmail);
}

            