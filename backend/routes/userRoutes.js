import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

const userInfoValidation = (action) => {
  switch (action) {
    case "register":
      return [
        body("firstName", "Please enter First Name")
          .exists()
          .isLength({ min: 1 }),
        body("lastName", "Please enter Last Name")
          .exists()
          .isLength({ min: 1 }),
        body("email", "Invalid email").exists().isEmail(),
        body(
          "password",
          "Password must be at least 8 characters and include a mix of letters, numbers, and special characters"
        )
          .exists()
          .isLength({ min: 8 })
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "i"
          ),
        body(
          "confirmPassword",
          "Confirm password must be at least 8 characters"
        )
          .exists()
          .isLength({ min: 8 })
          .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
              throw new Error("Password does not match");
            }
            return true;
          }),
      ];

    default:
      break;
  }
};

router.post("/register", userInfoValidation("register"), (req, res) => {
  const user = { name: "Nabin" };
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send(errors.array());
  }
  res.send(user);
});

export default router;
