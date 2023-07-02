import jwt from 'jsonwebtoken';

const validateToken = (req, res, next) => {
  // Retrieve the bearer token from the request headers
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token not found' });
  }

  try {
    // Verify and decode the token to get the user info
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Set the user information in the request object
    req.user = decoded.user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid access token' });
  }
};

export default validateToken;