const fs = require('fs');
const path = require('path');
const webpush = require('web-push');
const FileError = require('../exeptions/fileError.js');
const { usersSubscriptions } = require('../usersData/_subscriptions/userSubscriptions');

class notificationsService {
    async createSubsDir() {
        if (!fs.existsSync(process.env.SUBSCRIBTIONS_DATA_PATH)) {
            fs.mkdirSync(path.resolve(process.env.SUBSCRIBTIONS_DATA_PATH));
        }
        if (fs.existsSync(path.resolve(process.env.SUBSCRIBTIONS_DATA_PATH, 'userSubscriptions.js'))) return;
        fs.writeFile(
            path.resolve(process.env.SUBSCRIBTIONS_DATA_PATH, 'userSubscriptions.js'),
            `const usersSubscriptions = [];
            module.exports = { usersSubscriptions };`,
            err => {
                if (err) throw new Error('Error: creating notification file (_subscriptions)');
            }
        );
    }
    async addSubscription(subscription) {
        try {
            usersSubscriptions.push(subscription);
        } catch (error) {
            console.log(error);
        }
    }
    async sendPushNotification(message, subscription) {
        try {
            webpush.setVapidDetails(
                'mailto:vlad.petuxov.2018@bk.ru',
                process.env.VAPID_PUBLIC_KEY,
                process.env.VAPID_PRIVATE_KEY
            );
            const notificationPayload = {
                notification: {
                    title: 'Go to youtube',
                    body: message,
                    icon: 'assets/icon-152x152.png',
                    vibrate: [100, 50, 100],
                    data: {
                        dateOfArrival: Date.now(),
                        primaryKey: 1,
                        onActionClick: {
                            default: { operation: 'openWindow', url: 'https://www.youtube.com/watch?v=N2vtVBR0cKw&ab_channel=ВЫЖИВАЛОВО' },
                        },
                    },
                    // actions: [
                    //     {
                    //         action: 'explore',
                    //         title: 'Go to the site',
                    //     },
                    // ],
                },
            };
            Promise.resolve(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)))
                .then(ss => {
                    console.log('ssss:');
                    console.log(ss);
                })
                .catch(err => {
                    console.error('Error sending notification, reason: ', err);
                    FileError.customError(500, `Error sending notification, reason: ${err}`);
                });
        } catch (error) {
            console.log(error);
            throw new Error('Notification sending error');
        }
    }
}
module.exports = new notificationsService();
