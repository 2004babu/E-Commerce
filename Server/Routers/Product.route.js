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
  filterProductAdmin,
  getSuggest,
} = require("../Controllers/Product.Controller.js");
const isAdmin = require("../utils/isAdmin.js");


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
router.get("/autosuggest", getSuggest);
router.get("/filter", filterProduct);
router.get("/getRelatedProducts", getRelatedProducts);

router.get("/viewlog", isAuthendicatedUser, viewLogProduct);
router.get("/addLike", isAuthendicatedUser, AddAndRemoveLikeProduct);
router.get("/liked/:id", isAuthendicatedUser, likedProduct);
router.get("/cart", isAuthendicatedUser, getCartProduct);
router.get("/getRecentView", isAuthendicatedUser, getRecentView);

router.post("/comment", isAuthendicatedUser, addComment);
router.post("/cart", isAuthendicatedUser, cartProduct);

router.patch("/rating", isAuthendicatedUser, rateProduct);
router.patch("/comment/like", isAuthendicatedUser, likeComment);

router.post("/addProduct",isAuthendicatedUser,isAdmin,image.array("Product_Image[]", 10),  addProduct);
router.patch("/edit", isAuthendicatedUser, isAdmin, editProducts);
router.get("/allproduct", isAuthendicatedUser, isAdmin, AllProducts);
router.get("/admin/filter", isAuthendicatedUser, isAdmin, filterProductAdmin);

router.get("/admin/comments", isAuthendicatedUser, isAdmin, getAdminComments);

module.exports = router;

// router.patch("/comment/dislike",isAuthendicatedUser,dislikeComment);
