import { Router } from "express";

import { body, oneOf, validationResult } from "express-validator";
import { inputErrorHandler } from "./modules/middleware";
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update";

const router = Router();

/*
 ********** Product routes **********
 */

// function mid(req, res, next) {
//   req.shhh = "voila!";
//   next();
// }

// router.use(mid);

router.get("/product", getProducts);

router.get("/product/:id", getOneProduct);

router.post(
  "/product",
  body("name").isString(),
  inputErrorHandler,
  createProduct
);

router.put(
  "/product/:id",
  body("name").isString(),
  inputErrorHandler,
  updateProduct
);

router.delete("/product/:id", deleteProduct);

/*
 ********** Update routes **********
 */

router.get("/update", getUpdates);

router.get("/update/:id", getOneUpdate);

router.post(
  "/update",
  [
    body("title").exists().isString(),
    body("body").exists().isString(),
    body("productId").exists().isString(),
  ],
  inputErrorHandler,
  createUpdate
);
router.put(
  "/update/:id",
  [
    body("title").optional(),
    body("body").optional(),
    body(
      "status",
      oneOf([body("IN_PROGRESS"), body("SHIPPED"), body("DEPRECIATED")])
    ),
    body("version").optional(),
    body("asset").optional(),
  ],
  inputErrorHandler,
  updateUpdate
);
router.delete("/update/:id", deleteUpdate);

/*
********** Updatepoint routes **********

*/

router.get("/updatepoint", () => {});

router.get("/updatepoint/:id", () => {});

router.post(
  "/updatepoint",
  [
    body("name").exists().isString(),
    body("description").exists().isString(),
    body("updateId").optional().isString(),
  ],
  inputErrorHandler,
  (req, res) => {}
);

router.put(
  "/updatepoint/:id",
  [
    body("name").optional().isString(),
    body("description").optional().isString(),
  ],
  inputErrorHandler,
  (req, res) => {}
);

router.delete("/updatepoint/:id", () => {});

export default router;
