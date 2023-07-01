const dotenv = require('dotenv').config();
const user = require('../models/user');


exports.getExpirationDate = async (req, res, next) => {
    try {
        const accessCode = req.query.accessCode;

        const expirationDate = await user.getExpirationDate(accessCode);

        res.status(200).json(expirationDate[0][0]);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.setQuizData = async (req, res, next) => {
    try {
        const accessCode = req.body.accessCode;
        const quizNumber = req.body.quizNumber;
        const quizProgress = req.body.quizProgress;

        await user.setQuizProgress(accessCode, quizNumber, quizProgress);

        res.status(200).json({message: 'Quiz progress has been set!'});

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getQuizData = async (req, res, next) => {
    try {
        const accessCode = req.query.accessCode;
        const quizNumber = req.query.quizNumber;

        const quizProgress = await user.getQuizProgress(accessCode, quizNumber);

        res.status(200).json({ quizProgress: quizProgress[0][0] });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getAllQuizData = async (req, res, next) => {
    try {
        const accessCode = req.query.accessCode;
        const allQuizData = await user.getAllQuizData(accessCode);
        
        res.status(200).json({ allQuizData: allQuizData[0][0] });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}



