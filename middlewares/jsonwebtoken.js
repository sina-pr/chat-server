const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants');

const signToken = (payload = {}, expiresIn = '12h') => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });

  return token;
};

const authorizeBearerToken = (request, response, next) => {
  console.log(request.headers);
  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return response.status(400).json({
        message: 'Token not provided',
      });
    }

    console.log(token);
    const auth = jwt.verify(token, JWT_SECRET);
    console.log(auth);
    if (!auth) {
      return response.status(401).json({
        message: 'Unauthorized - invalid token',
      });
    }

    request.auth = auth;
    next();
  } catch (error) {
    console.error(error);
    return response.status(401).json({
      message: 'Unauthorized - invalid token',
    });
  }
};
const authorizeRole = (roles = []) => {
  return function (request, response, next) {
    const role = request.auth.role;
    const hasPermission = roles.includes(role);
    if (hasPermission) next();
    else {
      return response.status(401).json({
        message: "You don't have permission to access ",
      });
    }
  };
};

module.exports = {
  authorizeRole,
  authorizeBearerToken,
  signToken,
};
