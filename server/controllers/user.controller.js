const { validationResult } = require('express-validator');
const userService = require('../service/userService.js');
const fileService = require('../service/fileService.js');
const ApiError = require('../exeptions/apiError.js');
const tokenService = require('../service/tokenService.js');
class userController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array());
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const { userName, email, password } = req.body;
            const userData = await userService.registration(userName, email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            await fileService.createFile(email);
            return res.json({ userData, message: 'Registration completed successfully' });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async activationMail(req, res, next) {
        try {
            const { id, email } = req.body;
            await userService.sendActivate(id, email);
            return res.json({ message: 'An activation email has been sent to your email' });
        } catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ ...userData });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = tokenService.validateRefreshToken(refreshToken);
            if (!userData) {
                throw ApiError.UnauthorizedError();
            }
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({ message: 'You are logged out of your account' });
        } catch (err) {
            next(err);
        }
    }
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (err) {
            next(err);
        }
    }
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ ...userData });
        } catch (err) {
            next(err);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const { email } = req.body;
            await userService.resetPassword(email);
            return res.json({ message: 'A letter has been sent to your email' });
        } catch (err) {
            next(err);
        }
    }
    async toChangePassword(req, res, next) {
        const userID = req.query.id;
        try {
            return res.redirect(process.env.CHANGE_PASSWD_URL + '?id=' + userID);
        } catch (err) {
            next(err);
        }
    }
    async setNewPassword(req, res, next) {
        const { id, password } = req.body;
        try {
            const userEmail = await userService.newPassword(id, password);
            const userData = await userService.login(userEmail, password);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ ...userData, message: 'Your password has been changed' });
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new userController();
