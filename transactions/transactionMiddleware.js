const mongoose = require("mongoose");

const transactionMiddleware = async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    req.transaction = session;
    await next();
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

module.exports = transactionMiddleware;
