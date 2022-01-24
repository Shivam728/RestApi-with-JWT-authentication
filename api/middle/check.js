const jwt= require("jsonwebtoken");

module.exports= (req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token) {
       return res.status(403).json({
        msg: "Failed Authorization"
      });
    }
    try {
      const data = jwt.verify(token, "I wont tell you,get lost");
      req.username = data.username;
      req.userType = data.userType;
      return next();
    } catch {
      return res.status(403).json({
        msg: "Failed Authorization"
      });
    }
}