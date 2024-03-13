import { validationResult } from "express-validator";

export const inputErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  console.log("\n", errors, "\n");

  if (!errors.isEmpty()) {
    res.status(400);
    res.json({ errors: errors.array() });
  } else {
    next();
  }
};

export const asyncErrorHandler = (err, req, res, next) => {
  res.json({ error: err.message });
};
