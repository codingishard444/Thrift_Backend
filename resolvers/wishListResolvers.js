const wishList = require('../models/wishListModel');
const logger = require('../logger/authLogger');
const Product = require('../models/productModel');

const wishListResolvers = {
    Query:{
        getAllWishLists: async ()=>{
            try {
                const wishLists = await wishList.find({});
                return wishLists;
            } catch (error) {
                logger.error('Failed to fetch wish lists');
                throw new Error('Failed to fetch wish lists');
            }
        },
        getWishListByCustomerId: async (_,__,context) => {
        if (!context.user) {
                throw new Error('Unauthorized');
        }
        try {
            const customer_id = context.user.userId
            const wishListData = await wishList.find({ customer_id });
            return wishListData;
        } catch (error) {
            logger.error(`Wish list not found for customer: ${customer_id}`);
            throw new Error('Wish list not found');
        }
        }},
    Mutation:{
        addToWishList: async (_, args, context) => {
            if (!context.user) {
                throw new Error('Unauthorized');
            }
            const { product_id } = args;
            try {
                const customer_id = context.user.userId;
                const existingWishlist = await wishList.findOne({ product_id, customer_id })
                if (existingWishlist){
                    return existingWishlist;
                } else {
                const customer_id = context.user.userId;
                const product = await Product.findById(product_id);
                const product_name = product.product_name;
                const newWishlist = new wishList({ customer_id, product_id, product_name });
                await newWishlist.save();
                return newWishlist;
                }
            } catch(error) {
                logger.error(`Product not found: ${product_id}`);
                throw new Error('Product not found');
            }
        },
        removeFromwishList: async(_, args, context) => {
            if (!context.user) {
                throw new Error('Unauthorized');
            }
            const { wishlist_id } = args;
            try {
                const removedProductwishlist = await wishList.findByIdAndDelete(wishlist_id)
                return 'Product removed from wishList Successfully'
            } catch(error){
                throw new Error('Product not found')
            }
        }
    }
}
module.exports = { wishListResolvers };