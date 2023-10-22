const { Schema, model } = require("mongoose");

const Document = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  owner : { type: String, required: true },
  image: { type: String, required: true },
  oneTimeFee: { type: Number, required: true },
  subscriptionRate: { type: Number, required: true },
  currency: { type: String, required: true },
  folder: { type: String, required: true },
  isActive : { type: Boolean, default: true },
  crearedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("repository", Document);
