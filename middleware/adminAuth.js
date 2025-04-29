const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  // console.log("Middleware: verifyAdmin running...");

  try {
    let token;

    // Check token is present in cookie or headers
    if (req.cookies.access_token) {
      token = req.cookies.access_token;
      console.log("Coockie Token:-", token);
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
      console.log("headers Token:-", token);
    }

    //======== Get token from headers ====//
    // const authHeader = req.headers.authorization;
    // if (authHeader && authHeader.startsWith('Bearer ')) {
    //     token = authHeader.split(' ')[1]; // Split "Bearer token"
    //         console.log("headers Token:", token);
    // }

    //===== Get token from cookie =====/////
    //         const token = req.cookies.access_token; // Assuming you saved it as 'token' in cookie
    //         console.log("Coockie Token:", token);


    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No Token Provided." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;

    // Check admin role
   if (decoded.role !== 'admin') {
     return res.status(403).json({ message: "Access Denied. admins Only." });
    }

    console.log("Admin verified, calling next...");
    
    
    next(); // Everything ok, move to next
  } catch (error) {
    console.error("Error in verifyAdmin middleware:", error.message);
    return res.status(401).json({ message: "Invalid or Expired Token." });
  }
};

module.exports = verifyAdmin;
