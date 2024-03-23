import { Router } from "express";
import { CustomerControllers } from "./customer.controller";
import validateRequest from "../../middlewares/validateRequest";
import { CustomerValidations } from "./customer.validation";
import auth from "../../middlewares/auth";
import { USER_TYPE } from "../user/user.const";
import { upload } from "../../utils/sendImageToCloudinary";
import textToJsonParser from "../../middlewares/textToJsonParser";

const router = Router();
router.get(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.customer),
  CustomerControllers.getSingleCustomer,
);
router.get("/", auth(USER_TYPE.admin), CustomerControllers.getAllCustomers);
router.patch(
  "/wishlist",
  auth(USER_TYPE.admin, USER_TYPE.customer),
  CustomerControllers.updateWishList,
);
router.patch(
  "/shopping-cart",
  auth(USER_TYPE.admin, USER_TYPE.customer),
  CustomerControllers.updateShoppingCart,
);
router.patch(
  "/",
  auth(USER_TYPE.admin, USER_TYPE.customer),
  upload.single("file"),
  textToJsonParser,
  validateRequest(CustomerValidations.updateCustomerValidationSchema),
  CustomerControllers.updateCustomer,
);
router.delete(
  "/:id",
  auth(USER_TYPE.admin, USER_TYPE.customer),
  CustomerControllers.deleteCustomer,
);

export const CustomerRoutes = router;
