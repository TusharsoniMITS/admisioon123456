const jwt = require('jsonwebtoken')

const authRoles = (roles) => {
    return (req,res,next) =>{
        if(!roles.includes(req.userdata.roles)){
            req.flash('error','Unauthorised user please login')
            res.redirect('/')
        }
        next();
    }
}
module.exports = authRoles