// router
const Router = require('express').Router;
const router = new Router();
// controllers
const userController = require('../controllers/user.controller.js');
const fileController = require('../controllers/file.controller.js');
const apiController = require('../controllers/api.controller.js');
const notificationController = require('../controllers/notifications.controller.js');
// other
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware.js');
const captchaMiddleware = require('../middlewares/captchaMiddleware.js');
// authorization
router.post(
    '/registration',
    captchaMiddleware,
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 32 }),
    userController.registration
);
router.post('/login', captchaMiddleware, userController.login);
router.post('/logout', captchaMiddleware, userController.logout);
router.get('/refresh', userController.refresh);
// activate email
router.post('/sendActivationMail', userController.activationMail);
router.get('/activate/:link', userController.activate);
// reset password
router.post('/resetPassword', userController.resetPassword); // not checked
router.get('/setNewPassword/:link', userController.toChangePassword); // not checked
router.post('/refreshPassword', userController.setNewPassword); // not checked
// work with files
// ................
// work with API
router.get('/getRecipes/:numberOfSkip', apiController.fetchRecipes);
router.post('/uploadData', authMiddleware, fileController.uploadData);
// bot endpoints
router.post('/sendMessageToBot', captchaMiddleware, apiController.botConversation);
// avatar
router.post('/uploadAvatar', authMiddleware, fileController.uploadAvatar);
router.post('/getAvatar', authMiddleware, fileController.getAvatar);
router.post('/removeAvatar', authMiddleware, fileController.removeAvatar);
// push notifications
router.post('/registrateUserPushSubscription', authMiddleware, notificationController.registrateUserPushSubscription);
router.post('/sendNotification', authMiddleware, notificationController.sendNotification);

module.exports = router;
