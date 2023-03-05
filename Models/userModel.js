const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const groupSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "",
  },
  groupName: {
    type: String,
    default: "",
  },
  groupBarcode: {
    type: String,
    default: "",
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Adınızı girmeniz gerekiyor."],
  },
  surname: {
    type: String,
    required: [true, "Soy adınızı girmeniz gerekiyor."],
  },
  phone: {
    type: String,
    required: [true, "Telefon numaranızı girmeniz gerekiyor."],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email girmeniz gerekiyor"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Şifre girmeniz gerekiyor"],
  },
  userRole: {
    type: String,
    default: "silver",
  },
  merchantID: {
    type: String,
    default: "",
  },
  ApiKey: {
    type: String,
    default: "",
  },
  ApiSecret: {
    type: String,
    default: "",
  },
  groups: {
    type: Array,
  },
  profileImage: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
  },
  isActive: {
    type: String,
    default: ""
  }
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("Users", userSchema);
