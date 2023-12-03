const CaptchaError = require('../exeptions/captchaError.js');
const axios = require('axios');
module.exports = async function (req, res, next) {
    try {
        const { captchaToken } = req.body;
        if (!captchaToken) next(CaptchaError.tokenIsNotProvided());
        const captchaResult = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            {},
            {
                params: {
                    secret: process.env.CAPTCHA_KEY, // Secret API key
                    response: captchaToken,
                },
            }
        );
        if (!captchaResult.data.success) next(CaptchaError.captchaError());
        if (captchaResult.data.score < 0.5) next(CaptchaError.captchaError());

        next();
    } catch (err) {
        return next(CaptchaError.captchaError());
    }
};
