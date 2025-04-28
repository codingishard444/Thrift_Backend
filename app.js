require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./models/typeDefs');
const { userResolvers } = require('./resolvers/userResolvers');
const { productResolvers } = require('./resolvers/productResolvers')
const rateLimit = require('./rate-limiter/rate-limiter');
const User = require('./models/userModel'); // Make sure you have this model
const mongoose = require('mongoose');
const { orderResolvers } = require('./resolvers/orderResolvers');
const authMiddleware = require('./middleware/authMiddleware');
const PORT = 3000;

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
          ...orderResolvers.Query
        },
        Mutation: {
          ...userResolvers.Mutation,
          ...productResolvers.Mutation,
          ...orderResolvers.Mutation
        },
      };
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();

    app.use(cors());
    app.use(express.json());
    app.use(authMiddleware);
    app.use('/public', rateLimit, expressMiddleware(server, {
        context: async ({ req }) => {
            console.log('Context user:', req.user);
            return { user: req.user };
        },
    }));
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}

startServer().catch(err => {
    console.error('Failed to start server:', err);
});