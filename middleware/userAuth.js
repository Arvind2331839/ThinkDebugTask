const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  try {
    let token;

    // You can get token from cookies or Authorization header
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach decoded user info
    req.user = decoded;

    next(); // Allow to access the protected route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or Expired Token.' });
  }
};

module.exports = verifyUser;
