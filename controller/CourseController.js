const CourseModel = require("../model/Course");

class CourseController{
    static CourseInsert = async (req, res) => {
        try {
            // console.log(req.body);
            const {name,email,mobile,dob,gender,address,college,course,} = req.body
            const result = new CourseModel({
                name:name,
                email:email,
                mobile:mobile,
                dob:dob,
                gender:gender,
                address:address,
                college:college,
                course:course,
                user_id: req.userdata._id,
                // branch:branch,
                // user_id:req.user.id
            })
            await result.save()
            res.redirect('/Course_display')
        } catch (error) {
            console.log(error);
        }
    };
    static courseDisplay = async (req,res)=>{
        try {
            const {name, image} = req.userdata;
            const data = await CourseModel.find({user_id: req.userdata._id});
            // console.log(data)
            res.render("course/display",{d: data, n: name, i: image, msg: req.flash("success"),});
        } catch (error) {
            console.log(error)
        }
    };
    static courseview = async (req,res)=>{
        try {
            const {name, image} = req.userdata;
            const data = await CourseModel.findById(req.params.id)
            // console.log(data);
           res.render("course/view",{d: data, n: name, i: image});
        } catch (error) {
            console.log(error)
        }
    };
    static courseEdit = async (req,res)=>{
        try {
            const {name, image} = req.userdata;
            const data = await CourseModel.findById(req.params.id)
            // console.log(data);
           res.render("course/edit",{d: data, n: name, i: image});
        } catch (error) {
            console.log(error)
        }
    };
    static courseDelete = async (req,res)=>{
        try {
            const {name, image} = req.userdata;
            const data = await CourseModel.findByIdAndDelete(req.params.id);
            // console.log(data);
            req.flash("success","course successfully Deleted");
           res.redirect("/course_display");
        } catch (error) {
            console.log(error)
        }
    };
    static courseupdate = async (req, res) => {
        try {
            // console.log(req.body);
            const {name,email,mobile,dob,gender,address,college,course,} = req.body
            await CourseModel.findByIdAndUpdate(req.params.id,{
                name:name,
                email:email,
                mobile:mobile,
                dob:dob,
                gender:gender,
                address:address,
                college:college,
                course:course,
                // branch:branch,
                // user_id:req.user.id
            })
            req.flash("success","update successfully update");
            res.redirect('/Course_display')
        } catch (error) {
            console.log(error);
        }
    };
}
module.exports = CourseController