exports.RESPONSE_SENDER = async (res, status, devMessgae, prodMessage) => {
  console.log(process.env.NODE_ENV,process.env.NODE_ENV === "Development","process.env.NODE_ENV");
  
  if (process.env.NODE_ENV === "Development") {
    return res.status(status).json(devMessgae ?? {message:'Nothing Defined!'});
  } else {
    return res
      .status(status)
      .json(prodMessage ? prodMessage : "internal server Error");
  }
};
