const winston = require('winston');
const { combine, timestamp, printf } = winston.format;
const authLogger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: 'auth-logs.log' })
    ]
});

module.exports = authLogger;