const request = require('supertest')('http://localhost:3000'); // Replace with your server URL
const app = require('../../index');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const contactUsController = require('../../controllers/contactus');

describe('Contact Us Route', () => {
  describe('POST /contactus', () => {
    it('should return a 201 status code and success message', async () => {
      const contactUsControllerStub = sinon.stub(contactUsController, 'contactus').resolves();
      const response = await request.post('/contactus').send({
        fullName: 'John Doe',
        emailAddress: 'jdoe@mail.com',
        phoneNumber: '1234567890',
        message: 'Hello World!',
        sendCopy: true
      });
      expect(response.statusCode).equal(201);
      expect(response.body.message).equal('Contact us submission was successful!');
      contactUsControllerStub.restore();
    });

    it('should return a 500 status code and error message if required fields are missing', async () => {
      const response = await request.post('/contactus').send({});
      expect(response.statusCode).equal(500);
    });
  });
});