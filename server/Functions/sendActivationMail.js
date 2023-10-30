const uuid = require('uuid');
const mailService = require('../service/mailService.js');
const sendActivationMail = async email => {
    const activationLink = uuid.v4();
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
    return activationLink;
};
module.exports = {
    sendActivationMail,
};
