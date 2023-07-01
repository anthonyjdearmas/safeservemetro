
const dotenv = require('dotenv').config();
const { Client, Environment, ApiError } = require("square");
const fs = require('fs');
const path = require('path');

exports.authorizedcoursematerial = async (req, res, next) => {
    try {
        let stream = fs.createReadStream(path.join(__dirname, '../protected-assets/sample.pdf'));
        res.setHeader('Content-disposition', 'attachment; filename=' + 'sample.pdf');
        res.setHeader('Content-type', 'application/pdf');
        stream.pipe(res);
        res.sendStatus(200);

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

