const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const ContactUsController = require('../../controllers/contactus');

describe('ContactUsController', () => {
    describe('POST /contactus', () => {
        const sandbox = sinon.createSandbox();
        afterEach(() => {
            sandbox.restore();
            sinon.restore();
        });

        const req = {
            body: {
                fullName: 'John Doe',
                emailAddress: 'jdoe@mail.com',
                phoneNumber: '1234567890',
                message: 'Hello World!',
                sendCopy: true
            }
        };

        const statusJsonSpy = sandbox.spy();

        const res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ json: statusJsonSpy })
        };

        it('should return 201 if form submission is valid', async () => {
            await ContactUsController.contactus(req, res, () => { });
            expect(res.status.calledWith(201)).to.be.true;
            expect(statusJsonSpy.calledWith({ message: 'Contact us submission was successful!' })).to.be.true;
        });

        it('should return 422 if form submission is invalid', async () => {
            req.body.fullName = '';
            await ContactUsController.contactus(req, res, () => { });
            expect(res.status.calledWith(422)).to.be.true;
            expect(statusJsonSpy.calledWith({ message: 'Invalid form submission!' })).to.be.true;
        });
    });
});



