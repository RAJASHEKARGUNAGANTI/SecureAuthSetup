const jwt = require('jsonwebtoken');
const SECRET_KEY = 'Rwb5y46a2E7s7y0is4XsGNqyvxxw';

// Middleware to verify access token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);}
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;