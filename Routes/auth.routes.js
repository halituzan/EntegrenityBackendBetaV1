const router = require("express").Router();
const { register, login, info } = require("../Controllers/auth.controllers");
const { checkUser } = require("../Middlewares/auth.middleware");

router.post("/apiv1/", checkUser);
router.post("/apiv1/register", register);
router.post("/apiv1/login", login);
router.get("/apiv1/info/:id", info);

module.exports = router;
