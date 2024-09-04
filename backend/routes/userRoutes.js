import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { pool } from "../db/dbConnect";

const router = express.Router();

const saltRounds = 10;

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
        body("email").custom(async (email) => {
          const queryForEmail = {
            text: "SELECT email FROM USERS WHERE email=$1",
            values: [email],
          };
          const queryRes = await pool.query(queryForEmail);
          if (queryRes.rows.length > 0) {
            throw new Error("Email already in use");
          }
          return true;
        }),
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

router.post("/register", userInfoValidation("register"), async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send(errors.array());
  }
  const { firstName, lastName, email, password } = req.body;

  //hash the password
  const pwHash = await bcrypt.hash(password, saltRounds);

  const createUserQuery = {
    text: "INSERT INTO users(firstName,lastName,email,passwordHash) VALUES($1,$2,$3,$4) RETURNING firstName, lastName,email",
    values: [firstName, lastName, email, pwHash],
  };

  const queryRes = await pool
    .query(createUserQuery)
    .catch(() =>
      res
        .status(401)
        .send([{ param: "registrationError", msg: "Unable to add user" }])
    );

  const newUser = queryRes.rows[0];

  res.send(newUser);
});

export default router;
