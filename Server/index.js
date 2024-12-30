const express =require('express')
const app=express()
const path=require('path')
const cors=require('cors')
const dotenv =require('dotenv')
const cookieParser=require('cookie-parser')


dotenv.config({path:path.join(__dirname,'./.env')})

const authRoute =require('./Routers/auth.route.js')
const productsRoute =require('./Routers/Product.route.js')
const categoryRoute =require('./Routers/category.route.js')
const PaymentRoute =require('./Routers/Payment.route.js')
const connectMongo = require('./utils/db.js')
console.log(process.env.FRONTEND_URL)
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true,methods:["POST",'GET','PATCH','DELETE']}))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

const helmet = require('helmet');
app.use(helmet());

const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console()
  ]
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  dotfiles: 'ignore', // Prevent .env or other hidden files from being served
  index: false, // Disable directory listing
  maxAge:'1d'
}));
connectMongo()

app.use('/api/auth',authRoute)
app.use('/api/product',productsRoute)
app.use('/api/controll',categoryRoute)
app.use('/api/payment',PaymentRoute)


app.use(express.static(path.join(__dirname,'../Client/dist'),{dotfiles:'ignore',index:false, maxAge:'1d'}))
app.use(express.static(path.join(__dirname,'../Client/dist/index.html'),{dotfiles:'ignore',index:false, maxAge:'1d'}))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'../Client/dist/index.html'))
})

app.use((err, req, res,next) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
const PORT =process.env.PORT||9000
app.listen(PORT,()=>{
    console.log(`server Running in port ${PORT}`);
    
})
