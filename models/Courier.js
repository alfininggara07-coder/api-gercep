import mongoose from "mongoose";

const Courier = mongoose.model("couriers", {
  name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  whatsapp: {
    type: String,
    required: true,
  },
  no_kendaraan: {
    type: String,
    required: true,
    unique: true,
  },
  ulasan: {
    type: Array,
    required: false,
    default: [],
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

export default Courier;
