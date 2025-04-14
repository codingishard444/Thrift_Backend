const rateLimit = require('express-rate-limit')
const Loginrequestlimit = rateLimit({
    windowMS: 1 * 60 * 1000, 
    max: 5,
    message :'Too many login attempts'
})
module.exports = Loginrequestlimit;