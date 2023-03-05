const express = require("express");
var session = require('express-session')
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth.routes");
const crudRoutes = require("./Routes/crud.routes");
const app = express();
const PORT = process.env.PORT || 4000;
const KnexSessionStore = require('connect-session-knex')(session);
// const store = new KnexSessionStore({
//   tablename: 'session',
//   knex: kx,
//   createtable: false
// });

const sessionConfig = {
  secret: 'ty hb entegrenity com',
  name: 'Entegrenity',
  //store: store,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'none', // THIS is the config you are looing for.
  }
};

app.listen(PORT, () => {
  console.log("server Started on PORT", PORT);
});
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.xm8zxmu.mongodb.net/jwt`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err.message));

app.use(
  cors({
    origin: [
      "http://kampimi.site",
      "http://localhost:3000",
    ],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionConfig.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionConfig))

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", crudRoutes);
