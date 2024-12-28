

const express=require('express')
const { loginUser, loaduser, signUp, logout } = require('../Controllers/auth.Controller')
const router = express.Router()

const isAuthendicatedUser= require('../utils/isAuthendicatedUser.js')


router.post('/login',loginUser)
router.get('/loaduser',loaduser)
router.post('/signup',signUp)
router.get('/logout',isAuthendicatedUser,logout)

module.exports= router;


