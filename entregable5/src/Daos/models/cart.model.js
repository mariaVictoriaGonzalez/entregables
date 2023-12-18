import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: { type: Array, required: true },
});

const cartModel = model("carts", cartSchema);

export { cartModel };