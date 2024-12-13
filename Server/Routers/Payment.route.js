const express=require('express');
const { ProductPayment } = require('../Controllers/Payment.controller');
const isAuthendicatedUser = require('../utils/isAuthendicatedUser');
const router=express.Router();

router.post("/product",isAuthendicatedUser,ProductPayment);


  module.exports=router