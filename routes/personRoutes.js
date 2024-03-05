import express from 'express';
import Person from './../models/person.js'
import generateToken from './../jwt.js'
import Jwtmiddleware from './../jwt.js'

const router = express.Router();

router.get('/profile', Jwtmiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while fetching user profile" });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({ message: "Invalid username or password" })
    }
    const payLoad = {
      username: user.username,
      age: user.age
    }
    const token = generateToken(payLoad);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while logging in" })
  }
});

router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    const payLoad = {
      username: response.username,
      age: response.age
    }
    const token = generateToken(payLoad);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error, data not saved to database" })
  }
});

router.get('/person', async (req, res) => {
  try {
    const response = await Person.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Data not fetched from database" });
  }
});

export default router;
