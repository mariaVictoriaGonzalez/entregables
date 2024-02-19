import { chatModel } from "../models/messages.model.js";

export default class ChatService {
  async createMessage(mesg) {
    try {
      return await chatModel.create(mesg);
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  }

  async getAllMessages(mesg) {
    try {
      return await chatModel.find();
    } catch (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
  }
}
