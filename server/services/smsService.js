const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.ACCOUNTSID;  // replace with your Twilio account SID
const authToken = process.env.AUTHTOKEN;    // replace with your Twilio auth token

const client = twilio(accountSid, authToken);

const sendSms = (phone, content) => {
  return client.messages.create({
    body: content,
    from: '+15712978826',    // replace with your Twilio phone number
    to: phone,
  });
};

module.exports = sendSms;
