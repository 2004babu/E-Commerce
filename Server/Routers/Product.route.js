const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const isAuthendicatedUser = require("../utils/isAuthendicatedUser.js");
const {
  addProduct,
  AllProducts,
  filterProduct,
  getSingleProduct,
  likedProduct,
  rateProduct,
  addComment,
  likeComment,
  dislikeComment,
  cartProduct,
  getCartProduct,
  getCategoryImages,
  getAdminComments,
  getRecentView,
  getRelatedProducts,
  editProducts,
  AddAndRemoveLikeProduct,
  viewLogProduct,
} = require("../Controllers/Product.Controller.js");
const isAdmin = require("../utils/isAdmin.js");

const Stripe = require("stripe");
const stripe = new Stripe(
 process.env.STRIPE_SECRET_KEY
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/products"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const image = multer({ storage });

router.get("/p/:id", getSingleProduct);
router.post(
  "/addProduct",
  isAuthendicatedUser,
  isAdmin,
  image.array("Product_Image[]", 10),
  addProduct
);
router.get("/allproduct", isAuthendicatedUser, isAdmin, AllProducts);
router.get("/filter", filterProduct);
router.get("/viewlog", isAuthendicatedUser, viewLogProduct);
router.get("/addLike", isAuthendicatedUser, AddAndRemoveLikeProduct);
router.get("/liked/:id", isAuthendicatedUser, likedProduct);
router.patch("/rating", isAuthendicatedUser, rateProduct);
router.post("/comment", isAuthendicatedUser, addComment);
router.patch("/comment/like", isAuthendicatedUser, likeComment);
router.post("/cart", isAuthendicatedUser, cartProduct);
router.get("/cart", isAuthendicatedUser, getCartProduct);
router.get("/getRecentView", isAuthendicatedUser, getRecentView);

router.get("/getRelatedProducts", isAuthendicatedUser, getRelatedProducts);
router.patch("/edit", isAuthendicatedUser, isAdmin, editProducts);

router.get("/admin/comments", isAuthendicatedUser, isAdmin, getAdminComments);



module.exports = router;

// router.patch("/comment/dislike",isAuthendicatedUser,dislikeComment);
