// This file is responsible for communicating with the Square API
// so if the request is coming from the Square API, it will send a 200 response here
// and then it will send a request to accountgeneration middleware to actually do the account generation

const dotenv = require('dotenv').config();
const { Client, Environment, ApiError } = require("square");
const squareHandlerMiddleware = require('../middleware/accountgeneration');

const client = new Client({
    accessToken: "EAAAEdmf9EzEA7qX2rmcJWhfWFCd68FKe1lU7lFaubcEsKfSHrWDVUwLP_IyOi5x",
    environment: Environment.Production,
});
const { customersApi, ordersApi, transactionsApi } = client;

exports.squarehandler = async (req, res, next) => {
    try {
        const buyerEmail = req.body.data.object.payment.buyer_email_address;
        const orderId = req.body.data.object.payment.order_id;    
        const { result, ...httpResponse } = await ordersApi.retrieveOrder(orderId);
        const amountOfAccounts = result.order.lineItems[0].quantity;
        
        let parsedData = {
            customerEmail: buyerEmail,
            packagePurchased: result.order.lineItems[0].name,
            amountOfAccounts: amountOfAccounts,
        }
        await squareHandlerMiddleware.generateAccountData(parsedData);
        res.sendStatus(200);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

