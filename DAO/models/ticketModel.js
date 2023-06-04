import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  purchase_datetime: Date,
  quantity: Number,
  purchaser: String,
  created_at: Date,
  updated_at: Date,
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

export default ticketModel;