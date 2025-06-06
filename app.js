require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./models/typeDefs');
const { userResolvers } = require('./resolvers/userResolvers');
const { productResolvers } = require('./resolvers/productResolvers')
const { adminResolvers } = require('./resolvers/adminResolvers')
const rateLimit = require('./rate-limiter/rate-limiter');
const User = require('./models/userModel'); // Make sure you have this model
const mongoose = require('mongoose');
const { orderResolvers } = require('./resolvers/orderResolvers');
const { wishListResolvers } = require('./resolvers/wishListResolvers')
const { shoppingCartResolvers } = require('./resolvers/shoppingCartResolvers')
const authMiddleware = require('./middleware/authMiddleware');
const Adminauthenticate = require('./middleware/AdminauthMiddleware');
const PORT = 9090;

async function startServer() {
    const app = express();

    try {
        await mongoose.connect(process.env.MONGO_ENV, {
        });
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // Exit if DB connection fails
    }
    // here is combining/merging all the resolvers
    const resolvers = {
        Query: {
          ...userResolvers.Query,
          ...productResolvers.Query,
          ...orderResolvers.Query,
          ...adminResolvers.Query,
          ...wishListResolvers.Query,
          ...shoppingCartResolvers.Query
        },
        Mutation: {
          ...userResolvers.Mutation,
          ...productResolvers.Mutation,
          ...orderResolvers.Mutation,
          ...adminResolvers.Mutation,
          ...wishListResolvers.Mutation,
          ...shoppingCartResolvers.Mutation
        },
      };
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();
    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:8080'
    ];
    app.use(cors({
    origin: allowedOrigins,
    credentials: true
    }));
    app.use(express.json());
    // app.use(authMiddleware);
    app.use((req, res, next) => {
        authMiddleware(req, res, () => {
            Adminauthenticate(req, res, () => {
                next();
            });
        });
    });
    app.use('/public',expressMiddleware(server, {
        context: async ({ req }) => {
            console.log('Context user:', req.user);
            console.log('Context Admin:', req.admin);
            return { user: req.user,admin: req.admin };
        },
    }));
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}

startServer().catch(err => {
    console.error('Failed to start server:', err);
});