const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        password: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        users: [User]
        user(id:ID!): User
        userauth(email:String!,password:String!): AuthPayload
        logs: [String]
    }

    type Mutation {
        createUser(email:String!,password:String!): User
        register(email:String!,password:String!): User
        login(email:String!,password:String!): AuthPayload
    }
`;

module.exports = typeDefs;