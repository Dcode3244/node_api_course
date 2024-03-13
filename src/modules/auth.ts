import jwt from "jsonwebtoken";

import * as bycrypt from "bcrypt";

export const hashPassword = async (password) => {
  const hash = await bycrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (password, hash) => {
  const isValid = await bycrypt.compare(password, hash);
  return isValid;
};

export function createJWT(user) {
  const token = jwt.sign(
    { username: user.username, id: user.id },
    process.env.JWT_SECRET
  );
  return token;
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    return;
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }
};
