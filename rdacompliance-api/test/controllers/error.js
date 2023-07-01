const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const app = require('../../index');
const request = require('supertest')(app);

const ErrorController = require('../../controllers/error');

describe('Error Controller', () => {
    it('should call next with an error object', () => {
        const next = sinon.spy();
        ErrorController.get404({}, {}, next);
        expect(next.calledOnce).to.be.true;
        const error = next.args[0][0];
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('SOMETHING WRONG WRONG 404 - Not found.');
        expect(error.statusCode).to.equal(404);
    });
});
