const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        password: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        users: [User]
        user(id:ID!): User
        userauth(username:String!,password:String!): AuthPayload
        logs: [String]
    }

    type Mutation {
        createUser(username:String!,password:String!): User
        register(username:String!,password:String!): User
        login(username:String!,password:String!): AuthPayload
    }
`;

module.exports = typeDefs;