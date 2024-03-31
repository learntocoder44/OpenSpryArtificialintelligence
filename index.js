import express from "express";
import bodyParser from 'body-parser';
import db from "./db.js";
import personRoutes from './routes/personRoutes.js';
import passportStrategy from './passport.js'; // Correct the import if there's a typo
import passport from 'passport';

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

// Apply the Passport authentication middleware to specific routes
const AuthmiddleWare = passport.authenticate('local', { session: false });

// Define routes
app.get("/", (req, res) => {
  res.send("Server is running at port 3000");
});

// Apply personRoutes for handling person-related routes
app.use('/', personRoutes);


 const port=process.env.PORT;
app.listen(port, () => {
  console.log("Express server initialized");
});
