import mongoose from 'mongoose';


 const mongodbURL='mongodb+srv://durgamabhilash44:8NWHi7ek1dDNbX86@cluster0.qrzadfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(mongodbURL);

const db=mongoose.connection;

db.on('error',()=>{

   console.log("mongodb not connnectd");
})

db.on('connected',()=>{
  console.log("mongodb connected");
})

export default db;