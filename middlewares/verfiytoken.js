const jwt = require('jsonwebtoken');

const valid = (req, res, next) => {
  try {
    let token = req.headers.authorization || req.query.token;
    if (!token) {
      return res.status(401).json({ message: 'Token missing or invalid' });
    }
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
  }
};
module.exports = { valid };
