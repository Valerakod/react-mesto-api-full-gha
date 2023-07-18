const jwt = require('jsonwebtoken');

const AuthentificationError = require('../errors/AuthentificationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthentificationError('Authorization required!'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AuthentificationError('Authorization required!'));
  }
  req.user = payload;
  return next();
};
