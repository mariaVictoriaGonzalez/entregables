import { cartModel } from './models/cart.model.js'

class CartDao {
    async getAllCarts() {
        return await cartModel.find();
    }

    async getCartById(_id) {
        return await cartModel.findById(_id);
    }

    async createCart(cart) {
        return await cartModel.create(cart);
    }

    async updateCart(_id, cart) {
        return await cartModel.findByIdAndUpdate(_id, cart);
    }

    async deleteCart(_id) {
        return await cartModel.findByIdAndDelete(_id);
    }

    async addProductToCart(cid, pid) {
        const cartIndex = this.carts.findIndex(cart => cart.cid === cid);
        const cartToUse = this.carts[cartIndex];

        if (!cartToUse) {
            return console.log("El carrito no existe.");
        }

        const productIndex = cartToUse.products.findIndex(element => element.product === pid);

        if (productIndex === -1) {
            cartToUse.products.push({ "product": pid, "cuantity": 1 });
        } else {
            cartToUse.products[productIndex].cuantity += 1;
        }

        await this.saveFile();
        return console.log("Producto agregado al carrito.");
    }
}

export default new CartDao();