import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    user: { type: String, required: true },
    message: { type:String, required:true }
});

const chatModel = model("chat", chatSchema);

export { chatModel };