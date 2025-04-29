const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../logger/authLogger');
const Admin = require('../models/adminModel');

const adminResolvers = {
    Query: {
        protectedRoute_A: async (_,__,context) => {
            if (!context.admin) {
                throw new Error('Unauthorized');
            }
            const admin = await Admin.findById(context.admin.userId); 
            if (!admin) {
                throw new Error('User not found');
            }
            return admin;
        },
        admins: async () => {
            return await Admin.find({});
        },
        admin: async (_, { id }) => {
            return await Admin.findById(id);
        },
        adminauth: async (_, { email, password }) => {
            const admin = await Admin.findOne({ email });
            if (!admin) {
                throw new Error('Authentication failed');
            }
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                throw new Error('Authentication failed');
            }
            const token = jwt.sign({ admId: admin._id }, process.env.JWT_SECRET, {
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
        createAdmin: async (_, { email, password }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const admin = new Admin({ email, password: hashedPassword });
            await admin.save();
            return admin;
        },
        login_A: async (_, { email, password }) => {
            try {
                const admin = await Admin.findOne({ email });
                if (!admin) {
                    logger.warn(`Failed login attempt for admin: ${email}`);
                    throw new Error('Authentication failed');
                }
                const passwordMatch = await bcrypt.compare(password, admin.password);
                if (!passwordMatch) {
                    logger.warn(`Failed login attempt for admin: ${email}`);
                    throw new Error('Authentication failed');
                }
                const token = jwt.sign({ admId: admin._id }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                logger.info(`Login successful for admin: ${email}`);
                return { token, admin };
            } catch (error) {
                logger.error(`Login error for admin: ${email}`);
                throw new Error('Login failed');
            }
        }
    }
};

module.exports = { adminResolvers };