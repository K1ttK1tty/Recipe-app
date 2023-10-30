const jwt = require('jsonwebtoken');
const pool = require('../db').pool;
class tokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SERCRET, { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken,
        };
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SERCRET);
            return userData;
        } catch (err) {
            return null;
        }
    }
    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (err) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const [refToken] = await pool.query(`select refreshToken from tokens where user_id=?;`, [userId]);
        if (refToken[0]) {
            await pool.query(`update tokens set refreshToken=? where user_id=?;`, [refreshToken, userId]);
            return refreshToken;
        }
        await pool.query(`insert into tokens (refreshToken,user_id) values(?,?);`, [refreshToken, userId]);
        return refreshToken;
    }
    async removeToken(refreshToken) {
        await pool.query(`delete from tokens where refreshToken=?;`, [refreshToken]);
    }
    async findToken(refreshToken) {
        const [token] = await pool.query(`select refreshToken from tokens where refreshToken=?;`, [refreshToken]);
        return token[0].refreshToken;
    }
}
module.exports = new tokenService();
