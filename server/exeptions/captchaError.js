module.exports = class CaptchaError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static tokenIsNotProvided() {
        return new CaptchaError(403, 'Captcha token is not provided');
    }

    static invalidToken() {
        return new CaptchaError(403, 'Invalid token');
    }

    static captchaError(){
        return new CaptchaError(403, 'You are a bot (captcha error) :)')
    }
};
