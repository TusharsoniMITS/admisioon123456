const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');

const isLogin = async (req, res, next) => {
    const { token } = req.cookies
    if (token) {
        res.redirect('/home')
    }
    next();
}
module.exports = isLogin