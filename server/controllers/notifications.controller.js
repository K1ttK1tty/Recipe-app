const notificationsService = require('../service/notificationsService.js');
class notificationController {
    async registrateUserPushSubscription(req, res, next) {
        try {
            const { subscription } = req.body;
            notificationsService.addSubscription(subscription);
            res.status(200).json({ message: 'Your subscription has been registered' });
        } catch (err) {
            next(err);
        }
    }
    async sendNotification(req, res, next) {
        try {
            const { message, subscription } = req.body;
            notificationsService.sendPushNotification(message, subscription);
            res.status(200).json({ message: 'Your message sent successfully' });
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new notificationController();
