const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const isAuthendicatedUser= require('../utils/isAuthendicatedUser.js');
const isAdmin = require("../utils/isAdmin.js");
const { getCategoryImages, CreateCategoryImages, CreateCategoryImagesAll } = require("../Controllers/category.controller.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/category"));
  },filename:function(req,file,cb){
    cb(null,file.originalname)
  }
});


const image=multer({storage})

router.get("/categoryimages",getCategoryImages);
router.post("/categoryimages",isAuthendicatedUser,isAdmin,image.single('cateimage'),CreateCategoryImages);
router.post("/categoryimagesAll",isAuthendicatedUser,isAdmin,image.array('cateimage'),CreateCategoryImagesAll);


module.exports = router;

