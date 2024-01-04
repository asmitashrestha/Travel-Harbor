import express from "express";
import createNewUser from "../controller/userController";
import { check } from "express-validator";
import verifyUserLogin from "../controller/authController";
import verifyToken from "../middlewares/auth";
const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be 6 charatcer").isLength({ min: 6 }),
  ],
  createNewUser
);

router.post("/signin",[
  check("email","Email is required").isEmail(),
  check("password","Password must be 6 character").isLength({
    min:6
  })
],
verifyUserLogin
)

router.get('/validate-token', verifyToken, (req, res) => {
  res.status(200).send({ userId: req.userId });
})

module.exports = router;
