const jwt = require('jsonwebtoken');
const Adminauthenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.admin = null;
        return next();
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = { adminId: decoded.adminId }; 
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        req.admin = null;
        next();
    }
};
module.exports = Adminauthenticate;
