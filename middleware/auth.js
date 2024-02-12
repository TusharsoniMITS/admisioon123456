const jwt = require('jsonwebtoken');
const UserModel = require('../model/User');

const checkUserAuth = async (req,res,next)=>{
    //console.log("middleware auth");
    const {token} = req.cookies;//token get
    // console.log(token)
    if(!token){
        req.flash('error','unauthorized login');
        res.redirect("/");
    }else{
        const data = jwt.verify(token,'Tusharsoni12345');
        //data get
        const userdata = await UserModel.findOne({_id: data.ID});
        // console.log(userdata);
        //console.log(data);
        req.userdata = userdata;
        next();
    }
    
};

module.exports = checkUserAuth;