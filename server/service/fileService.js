const fs = require('fs');
const path = require('path');
const pool = require('../db.js').pool;
const fileError = require('../exeptions/fileError.js');

class fileService {
    async createUsersDataDir() {
        if (!fs.existsSync(process.env.USER_DATA_PATH)) {
            fs.mkdirSync(path.resolve(process.env.SERVER_DIR_PATH, 'usersData'));
        }
    }
    async createFile(email) {
        fs.mkdir(path.resolve(process.env.SERVER_DIR_PATH, 'usersData', `${email}_content`), err => {
            // асинхронная функция
            if (err) throw new Error('Error creating file ${email}_content');
        });
        fs.writeFile(
            path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `favorits_${email}.txt`),
            '[]',
            err => {
                if (err) throw new Error('Error creating file favorits');
            }
        );
        fs.writeFile(
            path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `myRecipes_${email}.txt`),
            '[]',
            err => {
                if (err) throw new Error('Error creating file myRecipes');
            }
        );
    }

    async uploadAvatar(email, avatar) {
        const extension = avatar.name.split('.').pop();
        const filePath = path.resolve(process.env.USER_DATA_PATH, `${email}_content`, `avatar.${extension}`);
        const [user] = await pool.query(`select id from user where email=?;`, [email]);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            await avatar.mv(filePath);
            await pool.query(`update avatar set avatarName=? where user_id=?;`, [`avatar.${extension}`, user[0].id]);
        } else {
            await avatar.mv(filePath);
            await pool.query(`insert into avatar (avatarName,user_id) values(?,?);`, [
                `avatar.${extension}`,
                user[0].id,
            ]);
        }
    }

    async getAvatar(email) {
        const [userId] = await pool.query('select id from user where email=?;', [email]);
        const [avatarName] = await pool.query('select avatarName from avatar where user_id=?;', [userId[0].id]);
        if (!avatarName[0].avatarName) {
            return false;
        } else {
            return path.resolve(process.env.USER_DATA_PATH, `${email}_content`, avatarName[0].avatarName);
        }
    }

    async removeAvatar(email) {
        const [userId] = await pool.query('select id from user where email=?;', [email]);
        const [avatarName] = await pool.query('select * from avatar where user_id=?;', [userId[0].id]);
        await pool.query('delete from avatar where user_id=?;', [userId[0].id]);
        if (avatarName[0]) {
            const filePath = path.resolve(
                process.env.USER_DATA_PATH,
                `${email}_content`,
                `${avatarName[0].avatarName}`
            );
            fs.unlinkSync(filePath);
        }
    }
}
module.exports = new fileService();
