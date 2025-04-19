const typeDefs = `#graphql
    type Product {
        id: ID!
        gender: String!
        price: Float!
        discount_rate: Float!
        category_type: String!
        sold_amount: Int!
        Total_stock: Int!
    }

    type Query {
        getAllProducts: [Product]
        getProduct(id: ID!): Product
    }

    type Mutation {
        createProduct(
            gender: String!,
            price: Float!,
            discount_rate: Float,
            category_type: String!,
            sold_amount: Int,
            Total_stock: Int!
        ): Product
    }
`;
