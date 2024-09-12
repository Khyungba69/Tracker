import jwt from "jsonwebtoken";
import config from "./config";

export const getToken = (userInfo) => {
  return jwt.sign(userInfo, config.JWT_SECRET, { expiresIn: "24h" });
};

export const getAuthUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res
          .status(401)
          .send({ param: "auth error", msg: "Invalid token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res
      .status(401)
      .send({ param: "auth error", msg: "Token not found" });
  }
};
