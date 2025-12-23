import mongoose from "mongoose";

const Delivery = mongoose.model("delivery", {
  author: {
    type: Object,
    required: true,
  },
  location1: {
    type: Object,
    required: true,
  },
  location2: {
    type: Object,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: Array,
    required: true,
    default: [],
  },
  url: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  courier: {
    type: Array,
    required: true,
    default: [],
  },
  type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default Delivery;
