require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ 'success': false, 'message': 'Access denied'});
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ 'success': false, 'message': 'Invalid Token'});
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;