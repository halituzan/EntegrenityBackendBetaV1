const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message === "incorrect email")
    errors.email = "Epostanız kayıtlı değil veya şifreniz yanlış";

  if (err.message === "incorrect password")
    errors.email = "Epostanız kayıtlı değil veya şifreniz yanlış";

  if (err.code === 11000) {
    if (Object.keys(err.keyValue)[0] === "phone") {
      errors.email = "Bu telefon adresi daha önce kullanılmış.";
      return errors;
    }
    if (Object.keys(err.keyValue)[0] === "email") {
      errors.email = "Bu eposta ile zaten kayıt olunmuş";
      return errors;
    }
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

// module.exports.info = async (req, res, next) => {
//   const token = req.cookies.jwt;
//   const param = req.params.id;
//   if (token) {
//     userModel
//       .findById(param)
//       .then((data) => {
//         res.json(data);
//       })
//       .catch((err) => {
//         res.json(err.message);
//       });
//   } else {
//     res.json({ status: false });
//     console.log(param)
//   }
// };

module.exports.info = async (req, res, next) => {
  const token = req.cookies.jwt;
  const param = req.params.id;
  console.log("param")
  // const user = await userModel.findById(param);
  // if (user) {
  //   res.json(user);
  // } else {
  //   res.json({ status: false });
  // }
  if (token) {
    console.log(token)

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        console.log(err)
        next();
      } else {
        const user = await userModel.findById(param);
        console.log(user)
        if (user) {
          console.log(user)
          res.json(user);
          console.log(user)
        } else {
          console.log(user)
          res.json({ status: false });
        }
        next();
      }
    });
  } else {
    res.json({ status: false });

    next();
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password, phone, name, surname, userRole, groups } =
      req.body;
    const user = await userModel.create({
      email,
      password,
      phone,
      name,
      surname,
      userRole,
      groups,
    });
    const token = createToken(user._id);
    res.cookie("jwt", token, {maxAge: maxAge * 1000, sameSite: 'none', secure: true});
    res.status(201).json({ user: user._id, created: true });
  } catch (error) {
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    console.log(token);

    res.cookie("jwt", token, {maxAge: maxAge * 1000,sameSite: 'none',secure: true});
    res.status(200).json({ user: user._id, created: true });
  } catch (error) {
    console.log(error);

    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};
