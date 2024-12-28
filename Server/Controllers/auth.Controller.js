const userModel = require("../Models/user.model");
const setJWTToken = require("../utils/jwt_token");
const jwt = require("jsonwebtoken");
const { RESPONSE_SENDER } = require("../utils/RESPONSE_SENDER");
const bcrypt = require("bcryptjs"); // Replace bcrypt with bcryptjs

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard regex for email validation
      return emailRegex.test(email);
    };
    
    
    
    if (!email || !password ||  !password.length>6||!isValidEmail(email)) {
      return RESPONSE_SENDER(res, 401, { message: "Fill the value" });
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return RESPONSE_SENDER(res, 401, { message: "User not found" });
    }

 

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return RESPONSE_SENDER(res, 401, { message: "Password does not match!" });
    }

    setJWTToken(res, 200, user);
  } catch (error) {
    console.log(error);
    return RESPONSE_SENDER(res, 500, { message: "Internal Server Error" });
  }
};

exports.signUp = async (req, res, next) => {
  try {
    const { userName, email, password, c_password } = req.body;


    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard regex for email validation
      return emailRegex.test(email);
    };
    if (!userName || !email || !password || !c_password|| !isValidEmail(email)) {
      return RESPONSE_SENDER(res, 300, {
        message: "Fill the value of inputs!",
      });
    }

    if (password !== c_password) {
      return RESPONSE_SENDER(res, 300, {
        message: "Passwords do not match! Check your password.",
      });
    }

    let new_password = await bcrypt.hash(password, 10); // Use bcryptjs hash method
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

exports.loaduser = async (req, res, next) => {
  try {
    // console.log();
    const { babu } = req.cookies;
    console.log(req.cookies);
    
    if (!babu) {
      return RESPONSE_SENDER(res, 200, { message: "cookie expires " });
    }
    const { id } = await jwt.verify(babu, process.env.JWT_SECRET, {
      algorithms: "HS256",
    });
    console.log(id);

    if (!id) {
      return RESPONSE_SENDER(res, 200, { message: "cookie expires " });
    }
    const user = await userModel.findById(id);

    if (!user) {
      return RESPONSE_SENDER(res, 200, { message: "user Not Found" });
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
