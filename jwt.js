import jwt from 'jsonwebtoken';

const secretKey = 'secretKey';

const Jwtmiddleware = async (req, res, next) => {
  try {
          const t= req.headers.authorization;

    if(!t){
      res.status(500).json({message:"token not found"})
    }
    const token = req.headers.authorization.split(' ')[1]; // Corrected delimiter

    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;
    next();
  } catch (error) {
    return next(error);
  }
}

const generateToken = (user) => {
  return jwt.sign(user, secretKey);
}

export { Jwtmiddleware };
export default generateToken;
