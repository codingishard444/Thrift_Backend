const shoppingCart = require('../models/shoppingCartModel')
const logger = require('../logger/authLogger')
const Product = require('../models/productModel')
const shoppingCartResolvers={
    Query:{
        getAllshoppingCarts: async()=>{
            return await shoppingCart.find({})
        },
        getShoppingcartBycustomerId: async(_,__,context)=>{
        if (!context.user) {
        throw new Error('Unauthorized');
        }
        try {
        const customer_id = context.user.userId;
        const shoppingcart = await shoppingCart.find({ customer_id })
        if (!shoppingcart || shoppingcart.length === 0){
            throw new Error('No shopping cart found for this customer ID');
        }
        return shoppingcart;
        } catch (error) {
            throw new Error('Failed to fetch shopping cart')
        }
        }
    },
    Mutation:{
        addProducttoShoppingcart: async(_, args,context)=>{
        if (!context.user) {
        throw new Error('Unauthorized');
        }
        const { product_id, quantity,size_type } = args;
        
        try {
            const customer_id = context.user.userId;
            const fetchedProduct = await Product.findById(product_id)
            const total_price = fetchedProduct.price*(1 - (fetchedProduct.discount_rate / 100)) * quantity;
            const product_name = fetchedProduct.product_name
            const ShoppingCart = new shoppingCart({ customer_id,product_id,product_name,quantity,size_type,total_price })
            await ShoppingCart.save()
            return ShoppingCart;
        } catch(error){
            console.error(error);
            throw new Error('Failed to add product to shopping cart')
        }
        }
    }
}
module.exports = { shoppingCartResolvers };