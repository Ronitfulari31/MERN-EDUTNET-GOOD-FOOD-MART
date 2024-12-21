const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const userCtrl = {
  //register function start
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await Users.findOne({ email }); // checks email is already in use
      //if email is already in use then
      if (user) return res.status(400).json({ msg: "Email Already Registerd" });
      //if email is not exist then
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at atleast 6 characters!!" });

      //password encryption as password donot store in plain text
      const passwordHash = await bcrypt.hash(password, 10);

      // create new user and save the credentials in mongodb
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      //save into monngodb
      await newUser.save();

      //creating jwt to authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refreshtoken",
      });

      res.json({ accesstoken,msg:"registration succesfully" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  //refershtoken function start
  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        // if refreshtoken is not found it show the error
        return res.status(400).json({ msg: "please Login or Registers" });

      //and if ths token is found then it will verify with jwt
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          // if not verify then show the error
          return res.status(400).json({ msg: "please Login or Register" });
        //new access token is created using the user's ID by calling the createAccessToken() function.
        const accesstoken = createAccessToken({ id: user.id }); //The access token will be valid for 1 day.
        //print the user and accesstoken
        res.json({ user, accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //login function start
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "USer does not exist register first" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

      const accesstoken = createAccessToken({ id:user._id })
      const refreshtoken = createRefreshToken({id:user._id})

      res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            path:'/user/refresh_token'
      })

      res.json({ accesstoken, msg: "Login Succesfully" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
//logout function start
logout: async (req, res) => {
    try {
        res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
        return res.json({ msg: "Logged out Succesfully" })

    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
},
//get user info function start
getUser:async(req,res)=>{
    try{
        const user = await Users.findById(req.user.id).select('-password')

        if(!user)return res.status(400).json({msg:"user not found"})
        res.json(user)

    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}

};




const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;
