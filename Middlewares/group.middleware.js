const jwt = require("jsonwebtoken");
const groupModel = require("../Models/groupModel");
require("dotenv").config();

const handleErrors = (err) => {
  let errors = { message: "" };

  if (err.code === 11000) {
    errors.message = "Bu isimde daha önce ürün grubu oluşturulmuş";
    return errors;
  } else {
    errors.message = "Bu işlemi yapmaya yetkiniz yok";
  }
  return errors;
};

module.exports.creategroup = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      console.log(err);
      if (err) {
        const errors = handleErrors(err);
        res.json({ errors, created: false });
        console.log(err);
        next();
      } else {
        const group = await groupModel.findById(decodedToken.id);
        if (group) {
          res.json({ groupName: group.groupName, created: true });
        } else {
          console.log(err);
          const errors = handleErrors(err);
          res.json({ errors, created: false });
        }
        next();
      }
    });
  } else {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
    next();
  }
};
