const express =require('express')
const app=express()
const path=require('path')
const cors=require('cors')
const dotenv =require('dotenv')
const cookieParser=require('cookie-parser')


dotenv.config({path:path.join(__dirname,'./.local.env')})

const authRoute =require('./Routers/auth.route.js')
const productsRoute =require('./Routers/Product.route.js')
const categoryRoute =require('./Routers/category.route.js')
const connectMongo = require('./utils/db.js')
app.use(cors({origin:true,credentials:true,methods:["POST",'GET','PATCH','DELETE']}))

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectMongo()

app.use('/api/auth',authRoute)
app.use('/api/product',productsRoute)
app.use('/api/controll',categoryRoute)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
  
const PORT =process.env.PORT||9000
app.listen(PORT,()=>{
    console.log(`server Running in port ${PORT}`);
    
})
