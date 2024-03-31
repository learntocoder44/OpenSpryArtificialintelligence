import mongoose from 'mongoose';




mongoose.connect(process.env.mongodbURL);

const db=mongoose.connection;

db.on('error',()=>{

   console.log("mongodb not connnectd");
})

db.on('connected',()=>{
  console.log("mongodb connected");
})

export default db;
