const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const isAuthendicatedUser= require('../utils/isAuthendicatedUser.js');
const { addProduct, AllProducts, filterProduct, getSingleProduct, likedProduct, rateProduct, addComment, likeComment, dislikeComment, cartProduct, getCartProduct, getCategoryImages, getAdminComments, getRecentView, getRelatedProducts } = require("../Controllers/Product.Controller.js");
const isAdmin = require("../utils/isAdmin.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/products"));
  },filename:function(req,file,cb){
    cb(null,file.originalname)
  }
});


const image=multer({storage})

router.get("/p/:id",isAuthendicatedUser,isAdmin,getSingleProduct);
router.post("/addProduct",isAuthendicatedUser,isAdmin,image.array('Product_Image[]',10),addProduct);
router.get("/allproduct",isAuthendicatedUser,isAdmin,AllProducts);
router.get("/filter",isAuthendicatedUser,isAdmin,filterProduct);
router.get("/liked/:id",isAuthendicatedUser,likedProduct);
router.patch("/rating",isAuthendicatedUser,rateProduct);
router.post("/comment",isAuthendicatedUser,addComment);
router.patch("/comment/like",isAuthendicatedUser,likeComment);
router.post("/cart",isAuthendicatedUser,cartProduct);
router.get("/cart",isAuthendicatedUser,getCartProduct);
router.get("/getRecentView",isAuthendicatedUser,getRecentView);

router.get("/getRelatedProducts",isAuthendicatedUser,getRelatedProducts);

router.get("/admin/comments",isAuthendicatedUser,isAdmin,getAdminComments );


module.exports = router;

// router.patch("/comment/dislike",isAuthendicatedUser,dislikeComment);