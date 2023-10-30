const nodemailer = require('nodemailer');
class mailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Account activation on the GreatFlavor',
            test: '',
            html: `
            <div>
                <h1>Account activation on the GreatFlavor</h1>
                <p>
                    Hello, to activate account you need to go to <a href='${link}'>link to app</a>,
                    your account will be activated automatically.
                 </p>
                 <p>If you receive this message by accident, just ingore it.</p>
            </div>
            `,
        });
    }

    async sendResetPassword(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Password changing on the GreatFlavor',
            test: '',
            html: `
            <div>
                <h1>Password changing on the GreatFlavor</h1>
                <p>
                    Hello, to change your password you need to go to <a href='${link}'>link to app</a> and enter new password.
                    Password changing may take some time, please be patient.
                </p>
                <p>If you receive this message by accident, just ingore it.</p>
            </div>
            `,
        });
    }
}
module.exports = new mailService();
