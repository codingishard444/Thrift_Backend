const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger/authLogger');
const User = require('../models/userModel'); // Make sure you import your User model

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        user: async (_, { id }) => {
            return await User.findById(id);
        },
        userauth: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Authentication failed');
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Authentication failed');
            }
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                expiresIn: '1h',
            });
            return { token, user };
        },
        logs: () => {
            const fs = require('fs');
            const path = require('path');
            try {
                const logFile = path.join(__dirname, '../logger/auth-logs.log');
                const logData = fs.readFileSync(logFile, 'utf8');
                const logLines = logData.split('\n').filter(line => line.trim() !== '');
                const last10Logs = logLines.slice(-10).reverse();
                return last10Logs;
            } catch (err) {
                console.error('Error reading log file:', err);
                throw new Error('Failed to read log file');
            }
        }
    },
    Mutation: {
        createUser: async (_, { email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, password: hashedPassword });
            await user.save();
            return user;
        },
        register: async (_, { email, password }) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User({ email, password: hashedPassword });
                await user.save();
                logger.info(`New user registered: ${email}`);
                return user;
            } catch (error) {
                logger.error(`Registration failed for user: ${email}`);
                throw new Error('Registration failed');
            }
        },
        login: async (_, { email, password }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    logger.warn(`Failed login attempt for user: ${email}`);
                    throw new Error('Authentication failed');
                }
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    logger.warn(`Failed login attempt for user: ${email}`);
                    throw new Error('Authentication failed');
                }
                const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
                    expiresIn: '1h',
                });
                logger.info(`Login successful for user: ${email}`);
                return { token, user };
            } catch (error) {
                logger.error(`Login error for user: ${email}`);
                throw new Error('Login failed');
            }
        }
    }
};

module.exports = { resolvers };