const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        password: String!
    }

    type Product {
        id: ID!
        product_name: String!
        gender: String!
        price: Float!
        discount_rate: Float!
        category_type: String!
        sold_amount: Int!
        Total_stock: Int!
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
        getAllProducts: [Product]
        getProduct(id: ID!): Product
    }

    type Mutation {
        createUser(email:String!,password:String!): User
        register(email:String!,password:String!): User
        login(email:String!,password:String!): AuthPayload
        createProduct(
            product_name: String!,
            gender: String!,
            price: Float!,
            discount_rate: Float,
            category_type: String!,
            sold_amount: Int,
            Total_stock: Int!
        ): Product
    }
`;

module.exports = typeDefs;