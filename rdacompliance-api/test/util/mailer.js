const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const jest = require('jest');

const nodemailer = require('nodemailer');
const iso_dompurify = require('isomorphic-dompurify');
const dotenv = require('dotenv').config();

const emailService = require('../../util/mailer');

jest.mock('nodemailer', () => ({
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockReturnValue((mailoptions, callback) => {})
    })
}));

describe('emailService', () => {
    describe('sendFormSubmission', () => {
        it('should call nodemailer.createTransport', () => {
            const spy = sinon.spy(nodemailer, 'createTransport');
            emailService.sendFormSubmission('full name', 'email address', 'phone number', 'message');
            expect(spy.calledOnce).to.be.true;
        });
    });

    describe('sendFormSubmissionCOPY', () => {
        it('should call nodemailer.createTransport', () => {
            const spy = sinon.spy(nodemailer, 'createTransport');
            emailService.sendFormSubmissionCOPY('full name', 'email address', 'phone number', 'message');
            expect(spy.calledOnce).to.be.true;
        });
    });
  
});