const jwt = require('jsonwebtoken');
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId }; 
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        req.user = null;
        next();
    }
};
module.exports = authenticate;