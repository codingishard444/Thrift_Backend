const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoutes');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
const PORT = 3000;

async function startServer(){
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start();

    const app = express()
    app.use(express.json())
    app.use("/graphql",expressMiddleware(server))
    app.listen(PORT,()=>{
        console.log(`Server running at port ${PORT}`)
    })
}
startServer();