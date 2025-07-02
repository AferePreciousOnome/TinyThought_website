import { verifyToken } from "../utils/jwt.js";

const authenticate = (req, res, next) => {
  let token = req.header("authorization");

  if (!token) {
    return res
      .status(403)
      .send({ msg: "authorization denied", isAuthenticated: false });
  }
  token = token.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ msg: "Invalid or expired token", isAuthenticated: false });
  }
};
export default authenticate;
