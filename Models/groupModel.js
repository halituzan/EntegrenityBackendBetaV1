const mongoose = require("mongoose");

const grupSchema = mongoose.Schema({
  groupName: {
    type: String,
    default: "",
    required: [true, "Grup ismi girmeniz gerekiyor"],
    unique: true,
  },
  productBarcodes: {
    type: Array,
    default: [],
  },
  listPrice: {
    type: String,
    default: "",
  },
  salePrice: {
    type: String,
    default: "",
  },
  quantity: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Groups", grupSchema);
