const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Product_Name: { type: String, required: true },
    Price: {
      MRP: { type: String, required: true },
      Offer: { type: String, required: true },
    },
    Owner: { type: String, required: true },
    P_Status: {
      type: String,
      required: true,
      enum: ["Publish", "Schedule", "Processing", "Waiting", "Private"],
      default: "Private",
    },
    inStock: { type: String, required: true },
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
    imageUrl: [{ type: String, required: true }],
    description: { type: String, required: true },
    Ratings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        Rate: { type: Number },
      },
    ],
    totalRate: { type: Number, default: 0 },
    likedBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        time: { type: Date, default: Date.now() },
      },
    ],
    viewedBy: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        time: { type: Date, default: Date.now() },
        log: [{ type: Date, default: Date.now() }],
      },
    ],

    Comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        userName: { type: String },
        likes: [{userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User" }}],
      },
    ],
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
