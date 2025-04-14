require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./models/User');
const { resolvers } = require('./routes/auth');
const rateLimit = require('./rate-limiter/rate-limiter');
const User = require('./models/userModel'); // Make sure you have this model
const mongoose = require('mongoose');
const PORT = 3000;

async function startServer() {
    const app = express();

    try {
        await mongoose.connect(process.env.MONGO_ENV, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1); // Exit if DB connection fails
    }
    // Create Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    // Apply middleware
    app.use(express.json());
    app.use('/graphql', rateLimit, expressMiddleware(server));

    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}

startServer().catch(err => {
    console.error('Failed to start server:', err);
});