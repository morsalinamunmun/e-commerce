import mongoose, { Types } from "mongoose";
import { TCustomer } from "./customer.interface";
import { Customer } from "./customer.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { customerSearchableFields } from "./customer.const";

const getAllCustomers = async (query: Record<string, unknown>) => {
  const customerQuery = new QueryBuilder(
    Customer.find().populate("wishList shoppingCart"),
    query,
  )
    .search(customerSearchableFields)
    .filter()
    .sort()
    .limit()
    .paginate();

  const result = await customerQuery.modelQuery;

  return result;
};

const getSingleCustomer = async (customerId: string) => {
  const result = Customer.findById(customerId).populate(
    "wishList shoppingCart",
  );
  return result;
};

const updateCustomer = async (
  customerId: string,
  payload: Partial<TCustomer>,
) => {
  const { name, ...remaining } = payload;

  const modifiedObject: Record<string, unknown> = {
    ...remaining,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedObject[`name.${key}`] = value;
    }
  }
  const result = Customer.findByIdAndUpdate(customerId, modifiedObject, {
    new: true,
  });
  return result;
};

const updateWishList = async (
  customerId: string,
  productId: Types.ObjectId,
) => {
  let result;
  const customer = await Customer.findOne({ user: customerId });
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }

  if (customer.wishList.includes(productId)) {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $pull: { wishList: productId } },
      { new: true },
    );
  } else {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $push: { wishList: productId } },
      { new: true },
    );
  }
  return result;
};
const updateShoppingCart = async (
  customerId: string,
  productId: Types.ObjectId,
) => {
  let result;
  const customer = await Customer.findOne({ user: customerId });
  if (!customer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  }

  if (customer.shoppingCart.includes(productId)) {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $pull: { wishList: productId } },
      { new: true },
    );
  } else {
    result = await Customer.findOneAndUpdate(
      { user: customerId },
      { $push: { wishList: productId } },
      { new: true },
    );
  }
  return result;
};

const deleteCustomer = async (customerId: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // Transaction 1: Delete User
    const user = await Customer.findById(
      { _id: customerId },
      { user: 1, _id: 0 },
    );

    const userId = user?.user.toString();

    const deletedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "User deletion failed");
    }
    // Transaction 2: Delete Customer
    const deletedCustomer = await Customer.findByIdAndUpdate(
      { _id: customerId },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer deletion failed");
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedCustomer;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const CustomerServices = {
  getAllCustomers,
  getSingleCustomer,
  updateWishList,
  updateShoppingCart,
  updateCustomer,
  deleteCustomer,
};
