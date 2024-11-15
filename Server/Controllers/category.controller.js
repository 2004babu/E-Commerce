const categoryModel = require("../Models/category.model");
const { RESPONSE_SENDER } = require("../utils/RESPONSE_SENDER");

exports.getCategoryImages = async (req, res, next) => {
  try {
    const limit = 3;

    const { page = 0, category: categoryQuery = "" } = req.query;
    const skip = page > 0 ? (page - 1) * limit : 0;

    console.log(limit, skip);

    if (!page&&!categoryQuery) {
      const enumCate= [
        "Electronics",
        "Computers",
        "Wearables",
        "Accessories",
        "Health",
        "Footwear",
        "Kitchen",
        "Gaming Laptop",
        "Dress",
        "Mobile",
        "Gadgets",
        "Food",
        "Toys",
        "Camara",
      ]
      const category=await categoryModel.aggregate([
        {$match:{category :{$in:enumCate}}},
        {$group:{_id:'$category',item:{$first:"$$ROOT"}}},
        {$replaceRoot:{newRoot:"$item"}}
      ])
    return RESPONSE_SENDER(res,200,{category,count:category.length})
    }


    let category;
    if (categoryQuery) {
      category = await categoryModel
        .find({ category: { $regex: categoryQuery, $options: "i" } })
        // .skip(skip)
        // .limit(limit);
      category.page = page + 1;
      // console.log(category);
      if (category.length > 0) {
        return RESPONSE_SENDER(
          res,
          200,
          { message: "get Succesfully ", category: category },
          { category: category }
        );
      }
    }
    // page=1 i want 1-10 ,page=2 iwant 10-20
    category = await categoryModel.find({}).skip(skip).limit(limit);

    // console.log(category);
    if (!category.length > 0) {
      return RESPONSE_SENDER(
        res,
        301,
        { message: "no category there ", category: category },
        { category: category }
      );
    }
    category.page = page + 1;

    return RESPONSE_SENDER(
      res,
      200,
      { message: "success ", category: category },
      { category: category }
    );
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "internal server error ", error },
      { error }
    );
  }

  // try {
  //   // i just want one data form each category ?

    

  //   return RESPONSE_SENDER(res,200,{category,count:category.length})
  // } catch (error) {
  //   console.log(error);
    
  // }
};

exports.CreateCategoryImages = async (req, res, next) => {
  try {
    console.log(req.files);
    console.log(req.file);
    const user = req.user;
    const { category: categoryQuery } = req.body;

    if (!categoryQuery && req.files.length > 0) {
      return RESPONSE_SENDER(res, 301, { message: "category  not get ! " });
    }

    let BASE_URL = `${process.env.BACKEND_URL}`;

    if (process.env.NODE_ENV === "Production") {
    }
    BASE_URL = `${req.protocol}://${req.get("host")}/uploads/category/${
      req.file.originalname
    }`;

    console.log(BASE_URL);

    const cate = await categoryModel.create({
      categoryQuery,
      image: { imageURL: BASE_URL },
    });

    if (!cate) {
      return RESPONSE_SENDER(res, 301, {
        message: "error in creating category !",
      });
    }

    console.log(cate);

    return RESPONSE_SENDER(res, 200, { BASE_URL, cate });
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { error }
    );
  }
};
exports.CreateCategoryImagesAll = async (req, res, next) => {
  try {
    console.log(req.files);
    console.log(req.file);
    const user = req.user;
    const { categoryQuery: category } = req.body;

    if (!categoryQuery) {
      return RESPONSE_SENDER(res, 301, { message: "category  not get ! " });
    }

    let BASE_URL = `${process.env.BACKEND_URL}`;

    if (process.env.NODE_ENV === "Production") {
    }
    if (req.files.length > 0) {
      const categoryIamge = await Promise.all(
        req.files.map(async (item) => {
          BASE_URL = `${req.protocol}://${req.get("host")}/uploads/category/${
            item.originalname
          }`;
          const newCategoryImage = await categoryModel.create({
            category,
            image: { imageURL: BASE_URL },
          });

          return await newCategoryImage.save({ validateBeforeSave: true });
        })
      );

      const urls = await categoryIamge.map((image) => image);
      return RESPONSE_SENDER(res, 200, { urls });
    }

    console.log(BASE_URL);
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(
      res,
      401,
      { message: "error in Product controller ", error },
      { error }
    );
  }
};
// const categoryModel = require("../Models/category.model");

// exports.getCategoryImages=async(req,res,next)=>{
//     try {

//       const category =await categoryModel.find({})

//       console.log(category);

//       res.json({category})

//       // const response=await ProductModel.find({category:i want one of this array })
//     } catch (error) {
//         console.log(error);
// return RESPONSE_SENDER(res,401,{message:"error in Product controller ",error},{error})
//     }
// }
