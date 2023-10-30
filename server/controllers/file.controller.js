const fileService = require('../service/fileService.js');
class fileController {


    async uploadAvatar(req, res, next) {
        try {
            const email = req.query.email;
            const avatar = req.files.avatar;
            await fileService.uploadAvatar(email, avatar);
        } catch (err) {
            next(err);
        }
    }
    async getAvatar(req, res, next) {
        try {
            const email = req.body.data;
            const response = await fileService.getAvatar(email);
            if (response) return res.download(response);
        } catch (err) {}
    }
    async removeAvatar(req, res, next) {
        try {
            const email = req.body.email;
            await fileService.removeAvatar(email);
        } catch (err) {
            next(err);
        }
    }
}
module.exports = new fileController();
