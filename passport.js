import passport from 'passport';
import passportLocal from 'passport-local'
import Person from './models/person.js'
import bcrypt from 'bcrypt'


passport.use(new passportLocal.Strategy(async function(username,password,done){
            try{
              const person = await Person.findOne({ username: username });

          if(!person){
            return done(null,false,{message:"invalid username"})
          }
         const passwordMatch=bcrypt.compare(person.password,password);

              if(passwordMatch){
                return done(null,person);
              }else{
                return done(null,false,{message:"invalid password"})
              }
              
              
              
            }catch(error){
               return done(error);
            }
  
}))

export default passport ;