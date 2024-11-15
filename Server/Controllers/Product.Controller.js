const { default: mongoose } = require("mongoose");
const ProductModel = require("../Models/Product.model.js");
const { RESPONSE_SENDER } = require("../utils/RESPONSE_SENDER.js");
const userModel = require("../Models/user.model.js");
// const {ObjectId}=require('mongoose').Types
exports.addProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    console.log(req.files);

    const { Product_Name, MRP, Offer, inStock, category, description } =
      req.body;
    let imagUrl;

    if (
      !Product_Name ||
      !MRP ||
      !Offer ||
      !inStock ||
      !category ||
      !description
    ) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  fill the Value " },
        { message: "fill The Value " }
      );
    }
    if (!req.files.length > 0) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  fill the Value " },
        { message: "image Not Found! " }
      );
    }
    let BASE_URL = [];
    if (req.files.length > 0) {
      req.files.forEach((item) => {
        console.log("item", item);
        BASE_URL.push(
          `${req.protocol}://${req.get("host")}/uploads/products/${
            item.originalname
          }`
        );
      });
    }

    const mapProduct = {
      Owner: user_id,
      Product_Name,
      Price: { MRP, Offer },
      inStock,
      category,
      description,

      imageUrl: BASE_URL,
    };
    const product = await ProductModel.create(mapProduct);

    console.log(product);

    return RESPONSE_SENDER(
      res,
      200,
      { mapProduct, product },
      { message: "Product Create SuccessFully " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};
exports.getSingleProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { id } = req.params;

    if (!id) {
      return RESPONSE_SENDER(
        res,
        301,
        { product, message: "id Not Founde " },
        { message: "id Not Founde " }
      );
    }

    const product = await ProductModel.findById(id);

    if (!product) {
      return RESPONSE_SENDER(
        res,
        301,
        { product, message: "Product Not Founde " },
        { message: "Product Not Founde " }
      );
    }

    return RESPONSE_SENDER(
      res,
      200,
      { product },
      { message: "Product get SuccessFully " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};
exports.filterProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    // console.log(req.query);

    // const {id}=req.params
    // console.log(id);
    const { page = 0 } = req.query;
    const limit = 10;
    const skip = page > 0 ? page * limit : 0;

    console.log(skip, limit, page);

    const {
      search = "",
      inStock = "",
      category = "",
      likeId = "",
      viewId = "",
    } = req.query;

    // console.log(search, inStock, category);

    if (likeId && mongoose.isValidObjectId(likeId)) {
      let likeProduct = await ProductModel.findById(likeId);
      let user = await userModel.findById(user_id);

      if (!user || !likeProduct) {
        return RESPONSE_SENDER(
          res,
          301,
          { product, message: "product || user  Not Founde " },
          { message: "id Not Founde " }
        );
      }

      let productLike = likeProduct.likedBy;

      //check is already liked ?
      productLike.forEach((item) => {
        console.log(item, item.userId.toString() == user_id.toString());
      });

      if (
        productLike.some((item) => {
          return item.userId.toString() === user_id.toString();
        })
      ) {
        console.log("there");

        // if liked it will update log session
        likeProduct.likedBy = productLike.filter(
          (like) => like.userId.toString() !== user_id.toString()
        );
        user.likes = user.likes.filter(
          (like) => like.product_id.toString() !== likeId.toString()
        );

        console.log(productLike);
      } else {
        console.log("there not");
        productLike.push({ userId: user_id });
        user.likes.push({ product_id: likeId });
      }

      console.log(productLike);
      likeProduct.save({ validateBeforeSave: true });
      user.save({ validateBeforeSave: true });
      //
      return RESPONSE_SENDER(
        res,
        200,
        { product: likeProduct, user },
        { message: "liked SuccessFully " }
      );
    }
    if (viewId && mongoose.isValidObjectId(viewId)) {
      const viewProduct = await ProductModel.findById(viewId);

      const productview = viewProduct.viewedBy;

      //check is already watch list  ?
      productview.forEach((item) => {
        console.log(item, item.userId.toString() == user_id.toString());
      });

      if (
        productview.some((item) => {
          return item.userId.toHexString() === user_id.toString();
        })
      ) {
        console.log("there");

        // if there it will update log session
        productview.map((prod) => {
          if (prod.userId.toString() === user_id.toString()) {
            prod.log.push(Date.now());
            console.log("enter");
          }
        });
      } else {
        console.log("there not");
        productview.push({ userId: user_id });
      }
      viewProduct.save({ validateBeforeSave: true });

      return RESPONSE_SENDER(
        res,
        200,
        { productview },
        { message: "session add SuccessFully " }
      );
    }

    if (category) {
      const product = await ProductModel.find({
        category: { $regex: category, $options: "i" },
      })
        .skip(skip)
        .limit(limit);

      return RESPONSE_SENDER(
        res,
        200,
        { product, count: product.length },
        { message: "Product filtered SuccessFully " }
      );
    }
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};

exports.likedProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { page = 0 } = req.query;
    const limit = 10;
    const skip = page > 0 ? page * limit : 0;

    const { id } = req.params;
    if (id && mongoose.isValidObjectId(id)) {
      let user = await userModel.findById(user_id);

      console.log(user.likes);

      const filteredID = user.likes.map((item) => item.product_id);

      let likeProduct = await ProductModel.find({ _id: { $in: filteredID } })
        .skip(skip)
        .limit(limit);

      if (!user || !likeProduct) {
        return RESPONSE_SENDER(
          res,
          301,
          { message: "product || user  Not Founde " },
          { message: "id Not Founde " }
        );
      }

      return RESPONSE_SENDER(
        res,
        200,
        { count: likeProduct.length, product: likeProduct, user },
        { message: "liked SuccessFully " }
      );
    }
    return RESPONSE_SENDER(
      res,
      301,
      //  { product:likeProduct,user },
      { message: "error in  likeProduct " },
      { message: "error in  likeProduct " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};
exports.rateProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const { productId = "", userRate = 0 } = req.query;

    console.log(req.query);

    if (
      productId &&
      mongoose.isValidObjectId(productId) &&
      Number(userRate) > 0
    ) {
      //  let user= await userModel.findById(user_id);

      //  console.log(user.likes);

      // const filteredID= user.likes.map(item=>item.product_id)

      let Product = await ProductModel.findById(productId);

      if (!Product) {
        return RESPONSE_SENDER(
          res,
          301,
          { message: "product Not Founde " },
          { message: "id Not Founde " }
        );
      }
      let totalRate;
      if (
        Product.Ratings.some(
          (item) => item.userId.toString() === user_id.toString()
        )
      ) {
        console.log("there");
        Product.Ratings = Product.Ratings.map((rate) => {
          if (rate.userId.toString() === user_id.toString()) {
            rate.Rate = userRate;
            return rate;
          }
          return rate;
        });

        totalRate = Product.Ratings.reduce((acc, curre) => {
          acc = +curre.Rate;
          return acc;
        }, 0);
      } else {
        console.log("enterd");

        Product.Ratings.push({ userId: user_id, Rate: userRate });

        totalRate = Product.Ratings.reduce((acc, curre) => {
          acc = +curre.Rate;
          return acc;
        }, 0);
      }
      Product.totalRate = totalRate;
      Product.save({ validateBeforeSave: true });
      console.log(Product);

      return RESPONSE_SENDER(
        res,
        200,
        { product: Product, message: "rate Add  SuccessFully " },
        { message: "rate Add  SuccessFully " }
      );
    }
    return RESPONSE_SENDER(
      res,
      301,
      //  { product:likeProduct,user },
      { message: "error in  likeProduct " },
      { message: "error in  likeProduct " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};

exports.AllProducts = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const product = await ProductModel.find({ Owner: user_id });

    console.log(product);

    return RESPONSE_SENDER(
      res,
      200,
      { product },
      { message: "Product Get SuccessFully " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};

/////comment
exports.addComment = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    const { userCMT, productId, userName } = req.body;

    if (!userCMT || !productId || !userName) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  comment  the Value " },
        { message: "fill The Value " }
      );
    }

    const product = await ProductModel.findById(productId);

    if (!product) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  Product Not Found   " },
        { message: " Product Not Found " }
      );
    }

    product.Comments.push({
      userId: user_id,
      comment: userCMT.toString(),
      userName,
    });

    //remove all for dev perpose
    // product.Comments=[]
    product.save({ validateBeforeSave: true });

    return RESPONSE_SENDER(
      res,
      200,
      { product },
      { message: "Product Create SuccessFully " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};
exports.likeComment = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    const { productId, CMTId } = req.body;

    console.log(productId, CMTId);

    if (!productId || !CMTId) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  comment  the Value " },
        { message: "fill The Value " }
      );
    }

    let product = await ProductModel.findById(productId);

    if (!product) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  Product Not Found   " },
        { message: " Product Not Found " }
      );
    }

    if (
      product.Comments.some((item) => item._id.toString() === CMTId.toString())
    ) {
      product.Comments = product.Comments.map((_cmt) => {
        if (_cmt._id.toString() === CMTId.toString()) {
          console.log(_cmt);

          if (
            _cmt.likes.some(
              (liked) => liked.userId.toString() === user_id.toString()
            )
          ) {
            _cmt.likes = _cmt.likes.filter(
              (like) => like.userId.toString() !== user_id.toString()
            );

            console.log("there");
            return _cmt;
          } else {
            _cmt.likes.push({ userId: user_id });
            return _cmt;
          }
        }
        console.log(_cmt);
        return _cmt;
      });
    }

    //remove all for dev perpose
    // product.Comments=[]
    product.save({ validateBeforeSave: true });

    // console.log(product);

    return RESPONSE_SENDER(
      res,
      200,
      { product },
      { message: "Product Create SuccessFully " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};
exports.cartProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    const { productId } = req.body;

    if (!productId) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  comment  the Value " },
        { message: "fill The Value " }
      );
    }

    let user = await userModel.findById(user_id);

    if (!user) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  Product Not Found   " },
        { message: " Product Not Found " }
      );
    }

    if (
      user.Cart.some(
        (item) => item.product_id.toString() === productId.toString()
      )
    ) {
      console.log("there");
      user.Cart = user.Cart.filter(
        (item) => item.product_id.toString() !== productId.toString()
      );
    } else {
      user.Cart.push({ product_id: productId });
    }
    user.save({ validateBeforeSave: true });

    return RESPONSE_SENDER(
      res,
      200,
      { user },
      { message: "Product Create SuccessFully " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};
exports.getCartProduct = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    if (!user_id) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  comment  the Value " },
        { message: "fill The Value " }
      );
    }

    let user = await userModel.findById(user_id);

    if (!user) {
      return RESPONSE_SENDER(
        res,
        401,
        { message: "error in Product controller  Product Not Found   " },
        { message: " Product Not Found " }
      );
    }
    if (!user.Cart.length > 0) {
      return RESPONSE_SENDER(
        res,
        200,
        { user, message: "there is No cart here " },
        { message: "there is No cart here " }
      );
    }
    const filteredid = user.Cart.map((ids) => ids.product_id);

    const product = await ProductModel.find({ _id: { $in: filteredid } });
    console.log(product);

    if (!product) {
      return RESPONSE_SENDER(
        res,
        200,
        { user, message: "there is No cart here " },
        { message: "there is No cart here " }
      );
    }

    return RESPONSE_SENDER(
      res,
      200,
      { user, product },
      { message: "cart get  SuccessFully " }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { message: error.message }
    );
  }
};

// exports.dislikeComment = async (req, res, next) => {
//   try {
//     const user_id = req.user._id;

//     const { productId,CMTId} =
//       req.body;

//       console.log(productId,CMTId);

//     if (
//       !productId ||!CMTId   ) {
//       return RESPONSE_SENDER(
//         res,
//         401,
//         { message: "error in Product controller  comment  the Value " },
//         { message: "fill The Value " }
//       );
//     }

//     let product = await ProductModel.findById(productId);

//         if (
//           !product    ) {
//           return RESPONSE_SENDER(
//             res,
//             401,
//             { message: "error in Product controller  Product Not Found   " },
//             { message: " Product Not Found " }
//           );
//         }

//         if (product.Comments.some(item=>item._id.toString()===CMTId.toString())) {

//           product.Comments=  product.Comments.map((_cmt)=>{

//             if (_cmt.likes.some(liked=>liked.toString()===user_id.toString())) {
//               _cmt.likes=  _cmt.likes.filter(like=>like.toString()!==user_id.toString())

//               console.log('there');
//               return _cmt
//             }else{
//               _cmt.likes.push(user_id)
//               return _cmt
//             }

//           })
//         }

//           //remove all for dev perpose
//         // product.Comments=[]
//         product.save({validateBeforeSave:true})

//         console.log(product);

//     return RESPONSE_SENDER(
//       res,
//       200,
//       {  product },
//       { message: "Product Create SuccessFully " }
//     );
//   } catch (error) {
//     console.log(error);
//     return RESPONSE_SENDER(
//       res,
//       401,
//       { message: "error in Product controller ", error },
//       { message: error.message }
//     );
//   }
// };

exports.getAdminComments = async (req, res, next) => {
  try {
    const user_id = req.user._id;

    const { page = 0 } = req.query;
    const limit = 10;
    const skip = page > 0 ? page * limit : 0;

    // console.log();
    
    if (!user_id ) {
      return RESPONSE_SENDER(res, 401, {
        message: "userId Not Found error in Product controller ",
      });
    }
    // if (!page | !pageNO | (pageNO !== Number(page))) {
    //   return RESPONSE_SENDER(res, 401, {
    //     message: " page not correct or not Found Product controller",
    //   });
    // }

    const user = await userModel.findById(user_id);
    // const Product=await ProductModel.find({Owner:user_id}).skip(skip).limit(limit)

    const Product = await ProductModel.aggregate([
      {
        $match: {
          Owner: user_id.toString(),
          $expr: { $gte: [{ $size: "$Comments" }, 1] },
        },
      },
      // {
      //   $group: {
      //     _id: "$_id",
      //     Comments: { $last: "$Comments" },
      //     Ratings: { $first: "$Ratings" },
      //   },
      // },
      // { $sort: { Ratings: -1 } },
      { $skip: skip },
      { $limit: limit },
      // { 
      //   $project: 
        
      //     {_id:0,
      //       totalPrice:{$sum:["Price.MRP"*"Price.Offer"]},
      //       product:"$$ROOT"
      //     }
        
      //  },
    ]);

    RESPONSE_SENDER(res, 200, { count: Product.length, Product });
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(res, 401, {
      message: "error in Product controller ",
      error,
    });
  }
};
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }

// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
//         return RESPONSE_SENDER
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
//         return RESPONSE_SENDER
//     }
// }
// exports.addManyProduct = async (req, res, next) => {
//   try {
//     const user_id = req.user._id;
//     console.log(req.files);

//     const { Product_Name, Price, inStock, category, description, P_Status } =
//       req.body;
//     let imagUrl;

//     if (
//       !Product_Name ||
//       !Price ||
//       !inStock ||
//       !category ||
//       !description ||
//       !P_Status
//     ) {
//       return RESPONSE_SENDER(
//         res,
//         401,
//         { message: "error in Product controller  fill the Value " },
//         { message: "fill The Value " }
//       );
//     }
//     if (!req.files.length > 0) {
//       return RESPONSE_SENDER(
//         res,
//         401,
//         { message: "error in Product controller  fill the Value " },
//         { message: "fill The Value " }
//       );
//     }
//     let BASE_URL = [];
//     if (req.files.length > 0) {
//       req.files.forEach((item) => {
//         console.log("item", item);
//         BASE_URL.push(
//           `${req.protocol}://${req.get("host")}/uploads/products/${item.originalname}`
//         );
//       });
//     }

//     const mapProduct = {
//       Owner: user_id,
//       Product_Name,
//       Price: { MRP: "$1233", Offer: "30%" },
//       inStock,
//       category,
//       description,
//       P_Status,
//       imagUrl:BASE_URL,
//     };
//     const product = await ProductModel.create(mapProduct);

//     console.log(product);

//     return RESPONSE_SENDER(
//       res,
//       200,
//       { product },
//       { message: "Product Create SuccessFully " }
//     );
//   } catch (error) {
//     console.log(error);
//     return RESPONSE_SENDER(
//       res,
//       401,
//       { message: "error in Product controller ", error },
//       { message: error.message }
//     );
//   }
// };

// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error})
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
//         return RESPONSE_SENDER
//     }
// }
// exports.getProduct=async()=>{
//     try {

//     } catch (error) {
//         console.log(error);
//         return RESPONSE_SENDER
//     }
// }

// exports.gatCartProducts =async(erq,res,next)=>{
//   try {

//   } catch (error) {
//     console.log(error);
//     return RESPONSE_SENDER(
//       res,
//       401,
//       { message: "error in Product controller ", error },
//       { message: error.message }
//     );
//   }
// }
