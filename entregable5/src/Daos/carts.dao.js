import { cartModel } from './models/cart.model.js';

class CartDao {
    async getAllCarts() {
        try {
            return await cartModel.find();
        } catch (error) {
            throw new Error(`Error getting carts: ${error.message}`);
        }
    }

    async getCartById(_id) {
        try {
            return await cartModel.findById(_id);
        } catch (error) {
            throw new Error(`Error getting cart by ID: ${error.message}`);
        }
    }

    async createCart(cart) {
        try {
            return await cartModel.create(cart);
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async updateCart(_id, cart) {
        try {
            return await cartModel.findByIdAndUpdate(_id, cart);
        } catch (error) {
            throw new Error(`Error updating cart: ${error.message}`);
        }
    }

    async deleteCart(_id) {
        try {
            return await cartModel.findByIdAndDelete(_id);
        } catch (error) {
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    };

    async addToCart (cartId, product) {
        const cart = await getCartById(cartId);
        cart.products.push(product);
    
        await updateCart(cartId, cart);
    };
}

export default new CartDao();
