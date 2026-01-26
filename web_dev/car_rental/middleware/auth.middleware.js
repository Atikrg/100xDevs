import jwt from "jsonwebtoken";

const JWT_SECRET =  process.env.JWT_SECRET;


export const createJsonWebTokenMiddleware = async (req, res) => {
  try {

    console.log("Creating JWT for user:", req.body);
    
    const {id, username} = req.user;


    if (!id || !username) {
      return res.status(400).json({ success: "fail", message: "User ID and username required" });
    }
    
    const token = jwt.sign(
      { id, username },
      JWT_SECRET,
    );

     return res.status(200).json({
      success: "success",
      data: {
        message: "Login successful",
        userId: id,
        token: token,

      },
    });
  } catch (err) {
    console.error("JWT generation error:", err);
    return res.status(500).json({ success: "fail", message: "Token generation failed" });
  }
};


export const verifyJsonWebTokenMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: "fail", message: "Authorization header missing" });
    } 
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: "fail", message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(500).json({ success: "fail", message: "Token verification failed" });
  }
};
