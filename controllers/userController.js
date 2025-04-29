const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {generateAccessToken,generateRefreshToken} = require("../services/generateToken");
const User = require("../models/userModel");



const signUP = async (req, res) => {
  const { username, email, password,role, organization } = req.body;

  try {
    // Validate required fields
    if (!username || !email || !password || !role || !organization
    ) {
      return res.status(400).send("Please provide all required fields");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    // console.log(existingUser)
    if (existingUser) {
      return res.status(409).send("User already registered with this email");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Create and save employee
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
      role,
      organization,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered", data: { username, email } });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in register",
      error: error.message,
    });
  }
};



const Login = async (req, res) => {
  
  const { email, password } = req.body;
  try {
  
    if (!email || !password) {
      return res.status(400).send("Please provide all required fields");
    }
    // Check Existing User-------------
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      return res.status(400).send("User not registered");
    }
    // Compare the provided password with the stored hashed password--------
    const ispasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!ispasswordValid) {
      res.status(400).json({
        message: "Invalid password",
        error: error.message,
      });
    }
    // Generate Access Token and Refresh Token---------------
    const AccessToken = await generateAccessToken(existingUser);
    const RefreshToken = await generateRefreshToken(existingUser);
    // console.log("AccessToken",AccessToken);
    // console.log("RefreshToken",RefreshToken);
    // Set both cookies separately
    const cookieOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true only for HTTPS
      maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
      sameSite: 'strict',  // Same-site cookie setting to mitigate CSRF
    };
    
    return res
      .cookie('access_token', AccessToken, cookieOption)
      .cookie('refresh_token', RefreshToken, cookieOption)
      .status(200)
      .json({
        message: 'Login Successful',
        AccessToken, // optional if you want frontend access token too
      });
    

  } catch (error) {
    res.send("Something went wrong in login");
  }
};



module.exports = { signUP,Login};
