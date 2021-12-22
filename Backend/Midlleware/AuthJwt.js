const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, "FAICALBAHSIS", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        error:err
      });
    }
    // req.userId = decoded.id;
    // jwt.destroy(token) 
    next();
  });
};
module.exports = {verifyToken};
