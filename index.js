const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./Routes/auth.routes");
const crudRoutes = require("./Routes/crud.routes");
const app = express();
const PORT = process.env.PORT || 4000;
const { createProxyMiddleware } = require('http-proxy-middleware');


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
// app.use('/tyapi', createProxyMiddleware({ target: 'https://api.trendyol.com', changeOrigin: true }));
// app.use('/entegrenityb1api', createProxyMiddleware({ target: 'https://entegrenity-api-b1.onrender.com/apiv1/', changeOrigin: true }));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
app.use("/", crudRoutes);
