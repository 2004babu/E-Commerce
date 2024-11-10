const categoryModel = require("../Models/category.model");

exports.getCategoryImages = async (req, res, next) => {
  try {
    const limit = 10;

    const { page=0, category="" } = req.query;

    const skip =page>0? (page - 1) * limit :0;
    if (category) {
      let categorys = await categoryModel
      .find({ category: { $regex: category, $options: "i" } })
      .skip(skip)
      .limit(limit);
category.page=page+1
      // console.log(categorys);
      if (categorys.length>0) {
        
        return RESPONSE_SENDER(
          res,
          200,
          { message: " ", category:categorys },
          { category:categorys }
        );
      }
      
    }
    // page=1 i want 1-10 ,page=2 iwant 10-20
    const categorys = await categoryModel.find({}).skip(skip).limit(limit);

    console.log(category);
    if (!categorys.length > 0) {
      return RESPONSE_SENDER(
        res,
        301,
        { message: "error in Product controller ", category:categorys },
        { category:categorys }
      );
    }
    return RESPONSE_SENDER(
      res,
      200,
      { message: "error in Product controller ", category:categorys },
      { category:categorys }
    );
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
const { RESPONSE_SENDER } = require("../utils/RESPONSE_SENDER");

exports.CreateCategoryImages = async (req, res, next) => {
  try {
    console.log(req.files);
    console.log(req.file);
    const user = req.user;
    const { category } = req.body;

    if (!category && req.files.length > 0) {
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
      category,
      image: { imageURL: BASE_URL },
    });

    if (!cate) {
      return RESPONSE_SENDER(res, 301, {
        message: "error in creating category !",
      });
    }
    // const category =await categoryModel.find({})

    console.log(cate);

    // res.json({category})
    return RESPONSE_SENDER(res, 200, { BASE_URL, cate });

    // const response=await ProductModel.find({category:i want one of this array })
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
    const { category } = req.body;

    if (!category) {
      return RESPONSE_SENDER(res, 301, { message: "category  not get ! " });
    }

    let BASE_URL = `${process.env.BACKEND_URL}`;

    if (process.env.NODE_ENV === "Production") {
    }
    if (req.files.length>0) {

      const categoryIamge=await Promise.all(

        req.files.map(async(item)=>{
          BASE_URL = `${req.protocol}://${req.get("host")}/uploads/category/${
            item.originalname
          }`;
       const newCategoryImage=    await categoryModel.create({category,image:{imageURL:BASE_URL}})
  
        return await newCategoryImage.save({validateBeforeSave:true})
        })
      )

      const urls=await categoryIamge.map((image)=>image)
    return RESPONSE_SENDER(res, 200, { urls });

    }

    console.log(BASE_URL);

    

    // if (!cate) {
    //   return RESPONSE_SENDER(res, 301, {
    //     message: "error in creating category !",
    //   });
    // }
    // // const category =await categoryModel.find({})

    // console.log(cate);

    // res.json({category})

    // const response=await ProductModel.find({category:i want one of this array })
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
