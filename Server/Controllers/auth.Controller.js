const userModel = require("../Models/user.model");
const bcrybt = require("bcrypt");
const setJWTToken = require("../utils/jwt_token");
const jwt = require("jsonwebtoken");
const { RESPONSE_SENDER } = require("../utils/RESPONSE_SENDER");

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return RESPONSE_SENDER(res, 401, { message: "fill the value " });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return RESPONSE_SENDER(res, 401, { message: "user Not Found " });
    }

    console.log(password, user);

    const validPassword = await bcrybt.compare(password, user.password);

    if (!validPassword) {
      return RESPONSE_SENDER(res, 401, { message: "password doesnot match! " });
    }

    setJWTToken(res, 200, user);
  } catch (error) {
    console.log(error);
  }
};

exports.loaduser = async (req, res, next) => {
  try {
    // console.log();
    const { babu } = req.cookies;
    console.log(req.cookies);
    
    if (!babu) {
      return RESPONSE_SENDER(res, 401, { message: "cookie expires " });
    }
    const { id } = await jwt.verify(babu, process.env.JWT_SECRET, {
      algorithms: "HS256",
    });
    console.log(id);

    if (!id) {
      return RESPONSE_SENDER(res, 401, { message: "cookie expires " });
    }
    const user = await userModel.findById(id);

    if (!user) {
      return RESPONSE_SENDER(res, 401, { message: "user Not Found" });
    }
    if(process.env.NODE_ENV==="Development"){
      return res.status(200).json({ success: true,user });

    }else
    {
      return res.status(200).json({ success: true });

    }
  } catch (error) {
    console.log(error);
  }
};

exports.signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userName, email, password, c_password } = req.body;
    if (!userName || !email || !password || !c_password) {
      return RESPONSE_SENDER(res, 300, {
        message: "Fill The Value Of inputs!",
      });
    }

    
    if (password !== c_password) {
      return RESPONSE_SENDER(res, 300, {
        message: "password doean't match! check password",
      });
    }

    let new_password = await bcrybt.hash(password, 10);
    console.log(new_password);
    let userDetail = {
      userName,
      email,
      password: new_password,
    };
    const user = await userModel.create(userDetail);
    console.log(user);

    setJWTToken(res, 200, user);
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(res, 300, { message: error.message });
  }
};

////////////////////////

exports.logout = async (req, res, next) => {
try {
    
    console.log('logout');
    
    res.cookie("babu", "", {
      maxAge: 0, 
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "strict",
    });
    

  return res.status(200).json({ message: "Logout successful" });

} catch (error) {
    console.log(error);
    
    
}
};
