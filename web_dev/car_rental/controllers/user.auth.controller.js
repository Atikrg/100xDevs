const pool = require("../config/db.config");
const bcrypt = require("bcrypt");


const SALT_ROUNDS = process.env.SALT_ROUNDS;

exports.loginController = async (req, res, next) => {
  try {

    console.log("Login attempt with data:", req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: "fail",
        message: "Username and password are required",
      });
    }

    const result = await pool.query(
      `SELECT id, password FROM users WHERE username = $1`,
      [username]
    );

    if (result.length === 0) {
      return res.status(401).json({
        success: "fail",
        message: "Invalid username or password",
        
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: "fail",
        message: "Invalid username or password",
      });
    }
    
      req.user = { id: user.id, username: username };
      next();
  } catch (error) {
    console.error("Error in loginController:", error);
    return res.status(500).json({
      success: "fail",
      message: "Internal Server Error",
    });
  }
};

exports.signUpController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: "fail",
        message: "Username and password are required",
      });
    }

    const query = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id
    `;

    const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));

    const result = await pool.query(query, [username, hashedPassword]);

    return res.status(201).json({
      success: "success",
      data: {
        message: "User created  successfully",
        userId: result[0].id,
      },
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({
        success: "fail",
        message: "Username already exists",
      });
    }
    console.error("Error in signUpController:", error);
    return res.status(500).json({
      success: "fail",
      message: "Internal Server Error",
    });
  }
};