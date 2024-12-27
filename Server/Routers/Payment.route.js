const express=require('express');
const { ProductPayment, CartPayment } = require('../Controllers/Payment.controller');
const isAuthendicatedUser = require('../utils/isAuthendicatedUser');
const router=express.Router();

router.post("/product",isAuthendicatedUser,ProductPayment);
router.post("/cart",isAuthendicatedUser,CartPayment);


  module.exports=router