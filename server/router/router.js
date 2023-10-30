// router
const Router = require('express').Router;
const router = new Router();
// controllers
const userController = require('../controllers/user.controller.js');
const fileController = require('../controllers/file.controller.js');
const apiController = require('../controllers/api.controller.js');
// other
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware.js');

// authorization
router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 32 }),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh); // not checked
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
// router.get('/getRecipes', authMiddleware, apiController.fetchRecipes);
// avatar
router.post('/uploadAvatar', authMiddleware, fileController.uploadAvatar);
router.post('/getAvatar', authMiddleware, fileController.getAvatar);
router.post('/removeAvatar', authMiddleware, fileController.removeAvatar);

module.exports = router;
