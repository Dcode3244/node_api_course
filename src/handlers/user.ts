import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res, next) => {
  const { username, password } = req.body;

  const hash = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        userName: username,
        password: hash,
      },
    });

    const token = createJWT(user);

    res.status(200);
    res.json(token);
  } catch (error) {
    error.type = "input";
    next(error);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      userName: username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: "user not found" });
    return;
  }

  const isValid = await comparePassword(password, user.password);
  console.log("isvalid: ", isValid);

  if (!isValid) {
    res.status(401);
    res.json({
      message: "incorrect password",
    });
    return;
  }

  const token = createJWT(user);

  res.status(200);
  res.json(token);
};
