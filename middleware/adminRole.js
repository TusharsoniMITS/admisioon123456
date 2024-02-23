const jwt = require('jsonwebtoken');

const authRoles = (role) => {
    return (req,res,next) =>{
        if(!role.includes(req.userdata.role)){
            req.flash('error','Unauthorised user please login')
            res.redirect('/')
        }
        next();
    }
}
module.exports = authRoles