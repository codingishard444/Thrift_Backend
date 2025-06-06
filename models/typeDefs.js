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
        imagePath: String!
        brand : String!
        description : String!
    }

    type Order {
        customer_id: String!
        product_id: String!
        quantity: Int!
        total_price: Float!
        size_type: String!
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
    type WishList {
        id:ID!
        customer_id: String!
        product_id: String!
        product_name: String!
    }
    type ShoppingCart {
        customer_id: String!
        product_id: String!
        product_name: String!
        quantity: Int!
        size_type: String!
        total_price: Float!
    }
    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        protectedRoute: User
        getAllusers: [User]
        getUserById(id:ID!): User
        logs: [String]
        protectedRoute_A: Admin
        getAlladmins: [Admin]
        getAdminbyId(id:ID!): Admin
        getAllProducts: [Product]
        getProductbyId(id: ID!): Product
        getAllorders: [Order]
        getOrderbyId(id: ID!): Order
        getAllWishLists: [WishList]
        getWishListByCustomerId: [WishList]
        getOrderByCustomerId: [Order]
        getOrderbyProductId(product_id: String!): [Order]
        getProductbySize(product_id: String!, size_type: String!): Size
        getProductbyCategory(category_type: String!): [Product]
        getProductbyBrand(brand: String!): [Product]
        getTrendingProducts: [Product]
        getLimitedStockProducts: [Product]
        getProductsizes(product_id:String!): [Size]
        getAllshoppingCarts:[ShoppingCart]
        getShoppingcartBycustomerId: [ShoppingCart]
    }

    type Mutation {
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
            imagePath:String!,
            brand:String!,
            description:String!
        ): Product
        updateProduct(
            product_id: String!,
            product_name: String!,
            gender: String!,
            price: Float!,
            discount_rate: Float!,
            category_type: String!,
            imagePath: String!,
            brand: String!,
            description: String!
        ): Product
        deleteProduct(product_id:String!):String
        updateProductSizeStock(
            product_id: String!,
            size_type: String!,
            stock_amount: Int!
        ): Size
        AddProductSize(
            product_id: String!,
            size_type: String!,
            stock_amount: Int!
        ): Size
        addProducttoShoppingcart(product_id:String!,quantity:Int!,size_type:String!): ShoppingCart
        createOrder(product_id:String!,quantity:Int!,size_type:String!): Order
        addToWishList(product_id: String!): WishList
    }
`;

module.exports = typeDefs;