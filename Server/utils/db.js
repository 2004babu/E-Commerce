const mongoose =require('mongoose')


const connectMongo =async ()=>{
    try {
        console.log(process.env.MONGO_URL);
        if(!process.env.MONGO_URL)console.log
        ('mongoURL not Fund!')
        await mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('Connect Succes');
        })
    } catch (error) {
        console.log(error);
        process.exit(1)   
    }
}
module.exports =connectMongo