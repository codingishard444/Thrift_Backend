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

    type Order {
        customer_id: String!
        product_id: String!
        quantity: Int!
        total_price: Float!
    }
    
    type Size {
        product_id: String!
        size_type: String!
        stock_amount: Int!
    }

    type Admin {
        id: ID!
        email: String!
        password: String!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        protectedRoute: User
        users: [User]
        user(id:ID!): User
        userauth(email:String!,password:String!): AuthPayload
        logs: [String]
        protectedRoute_A: Admin
        admins: [Admin]
        admin(id:ID!): Admin
        adminauth(email:String!,password:String!): AuthPayload
        getAllProducts: [Product]
        getProduct(id: ID!): Product
        orders: [Order]
        order(id: ID!): Order
    }

    type Mutation {
        createUser(email:String!,password:String!): User
        register(email:String!,password:String!): User
        login(email:String!,password:String!): AuthPayload
        createAdmin(email:String!,password:String!): Admin
        login_A(email:String!,password:String!): AuthPayload
        createProduct(
            product_name: String!,
            gender: String!,
            price: Float!,
            discount_rate: Float,
            category_type: String!,
            sold_amount: Int,
            Total_stock: Int!
        ): Product
        updateProduct(
            product_id: String!,
            product_name: String!,
            discount_rate: Float,
        ): Product
        updateProductSizeStock(
            product_id: String!,
            size_type: String!,
            stock_amount: Int!
        ): Size
        createOrder(product_id:String!,quantity:Int!,size_type:String!): Order
    }
`;

module.exports = typeDefs;