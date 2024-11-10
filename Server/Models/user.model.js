const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: { type: String, required: true, unique: true },
    Role: { type: String, default: "user" },
    password: { type: String, required: true, select: false },
    pass_resetToken: String,
    pass_Reset_Expire: Date,
    likes: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
    Cart: [
      {
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
