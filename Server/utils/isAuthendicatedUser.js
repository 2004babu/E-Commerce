const userModel = require("../Models/user.model");
const { RESPONSE_SENDER } = require("./RESPONSE_SENDER");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const { babu } = req.cookies;
    // console.log("babu", babu);

    if (!babu) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in isAuthendicated user" },
        { message: "your Not Authorized Person ,cookie Expired!" }
      );
    }

    const { id } = await jwt.verify(babu, process.env.JWT_SECRET, {
      algorithms: "HS256",
    });

    // console.log("id", id);
    if (!id) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in isAuthendicated user cookie Expires" },
        { message: "your Not Authorized Person ,cookie not Found!" }
      );
    }

    const user = await userModel.findById(id);
    if (!user) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in isAuthendicated user User Not Found" },
        { message: "your Not Authorized Person ,user not Found!" }
      );
    }
    req.user = user;

    // console.log(user);
    next();
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in isAuthendicated user", error },
      { message: "your Not Authorized Person" }
    );
  }
};
