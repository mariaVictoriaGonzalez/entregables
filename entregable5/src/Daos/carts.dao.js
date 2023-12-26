import { cartModel } from "./models/cart.model.js";
import productsDao from "./products.dao.js"

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
  }

  async addProductToCart(cid, pid) {
    try {
      const cartToUse = await cartModel.findById(cid);

      if (!cartToUse) {
        const cart = {};

        return await cartModel.create(cart);
      }

      const productToAdd = await productsDao.findById(pid);
      
      if (productToAdd) {
        const productIndex = cartToUse.products.findIndex(
          (element) => element.product === pid
        );
        if (productIndex !== -1) {
          cartToUse.products[productIndex].quantity += 1;
        } else {
          cartToUse.products.push({ product: pid, quantity: 1 });
        }
      }

      await cartModel.findByIdAndUpdate(cid, cartToUse);

      console.log("Product added to the cart.");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }
}

export default new CartDao();
