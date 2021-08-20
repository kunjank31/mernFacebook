const User = require("../models/auth_Models");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];
  jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
    if (err) return next(err);
    req.user = user;
    return next();
  });
};
module.exports = auth;
