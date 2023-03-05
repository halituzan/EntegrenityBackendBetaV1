const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;
require("dotenv").config();

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge,
  });
};
module.exports.updateMerchantApi = async (req, res, next) => {
  const { merchantID, ApiSecret, ApiKey } = req.body;
  await userModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        merchantID: merchantID,
        ApiKey: createToken(ApiKey),
        ApiSecret: createToken(ApiSecret),
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
module.exports.updateProfileImage = async (req, res, next) => {
  const { profileImage, isActive } = req.body;
  console.log(req.body);
  await userModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        profileImage: profileImage,
        isActive: isActive,
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports.updateMerchantGroups = async (req, res, next) => {
  const { groups } = req.body;
  const { id } = req.params;

  await userModel
    .findOneAndUpdate(
      { _id: id },
      {
        $push: { groups: groups },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
};

module.exports.removeGroup = async (req, res, next) => {
  const { groups } = req.body;
  await userModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { groups: groups },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
module.exports.updateGroupsItems = async (req, res, next) => {
  const { groups } = req.body;
  const { id } = req.params;
  await userModel
    .findOneAndUpdate(
      { _id: id },
      {
        $set: {
          groups: groups,
        },
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
