const tokenService = require('../service/tokenService.js');
const pool = require('../db.js').pool;
const generateAndSaveToken = async user => {
    const [userActivation] = await pool.query(`select isActivated from activation where user_id=?;`, [user[0].id]);
    const [userData] = await pool.query(`select * from userInfo where user_id=?`,[user[0].id])
    const tokens = tokenService.generateTokens({
        id: user[0].id,
        name: userData[0].name,
        email: user[0].email,
        registrationDate: userData[0].registrationDate,
    });
    await tokenService.saveToken(user[0].id, tokens.refreshToken);
    return {
        ...tokens,
        user: {
            id: user[0].id,
            name: userData[0].name,
            email: user[0].email,
            registrationDate: userData[0].registrationDate,
            isActivated: userActivation[0].isActivated,
        },
        message: 'You are logged in',
    };
};

module.exports = {
    generateAndSaveToken,
};
