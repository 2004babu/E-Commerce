const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Computers",
        "Wearables",
        "Accessories",
        "Health",
        "Footwear",
        "Kitchen",
        "Gaming Laptop",
        "Dress",
        "Mobile",
        "Gadgets",
        "Food",
        "Toys",
        "Camara",
      ],
    },
    image: {
      imageURL: { type: String, required: true }
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
