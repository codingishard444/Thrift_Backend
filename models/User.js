const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        password: String!
    }

    type Query {
        users: [User]
        user(id:ID!): User
        userauth(username:String!,password:String!): User
    }

    type Mutation {
        createUser(id:ID!,username:String!,password:String!): User
    }
`

module.exports = typeDefs