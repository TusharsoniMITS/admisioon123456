const UserModel = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require('cloudinary').v2;
const CourseModel = require("../model/Course")


cloudinary.config({
    cloud_name: 'djbnrq83q',
    api_key: '113997631458756',
    api_secret: 'RrZBlFCqIP2op-VCy6qwbUs5mL8',
});

class FrontController {
    static login = (req, res) => {
        // res.send("hello home")
        try {
            res.render('login', { msg: req.flash('success'), error: req.flash('error') });
        } catch (error) {
            console.log(error);
        }
    };
    static about = (req, res) => {
        // res.send("hello home")
        try {
            const { name, image } = req.userdata;
            res.render('about', { n: name, i: image });
        } catch (error) {
            console.log(error);
        }
    };
    static contact = (req, res) => {
        // res.send("hello home")
        try {
            const { name, image } = req.userdata;
            res.render('contact', { n: name, i: image });
        } catch (error) {
            console.log(error);
        }
    };
    static register = async (req, res) => {
        try {
            res.render('register', { msg: req.flash('error') });
        } catch (error) {
            console.log(error);
        }
    };
    static home = async (req, res) => {
        try {
            const { name, image, email, id, mobile, dob } = req.userdata;
            const btech = await CourseModel.findOne({ user_id: id, course: "btech" });
            // console.log(btech);
            //console.log(name);
            res.render('home', { n: name, i: image, e: email, m: mobile, dob: dob, btech: btech });
        } catch (error) {
            console.log(error);
        }
    };
    //data insert reg
    static dashboard = async (req, res) => {
        try {
            const { name, image } = req.userdata;
            res.render('dashboard', { n: name, i: image });
        } catch (error) {
            console.log(error);
        }
    };
    //data insert reg
    static insertReg = async (req, res) => {
        try {

            // res.render('register');
            // console.log(req.body);
            //console.log(req.files.Image);
            const file = req.files.Image;
            //image upload
            const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, { folder: "profile", });
            // console.log(uploadImage);
            const { n, e, p, cp } = req.body;
            const user = await UserModel.findOne({ email: e });
            //console.log(user);
            if (user) {
                req.flash("error", "email already exist ");
                res.redirect("/register");
            } else {
                if (n && e && p && cp) {
                    if (p == cp) {
                        const hashpassword = await bcrypt.hash(p, 10)
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashpassword,
                            image: {
                                public_id: uploadImage.public_id,
                                url: uploadImage.secure_url,
                            },
                        });
                        await result.save();
                        req.flash("success", "Register success plz login")
                        res.redirect('/');//route url
                    } else {
                        req.flash("error", "password and conform password not same");
                        res.redirect("/register");
                    }
                } else {
                    req.flash("error", "All field req");
                    res.redirect("/register");
                }
            }
            // const result = new UserModel({
            //     name: n,
            //     email: e,
            //     password: p,
            // });
            // await result.save();
            // res.redirect('/');//route url
        } catch (error) {
            console.log(error);
        }
    };
    static vlogin = async (req, res) => {
        try {
            const { e, p } = req.body;
            if (e && p) {
                const user = await UserModel.findOne({ email: e })

                if (user != null) {
                    const isMatched = await bcrypt.compare(p, user.password)
                    if (isMatched) {
                        if (user.role == 'admin') {
                            //token
                            let token = jwt.sign({ ID: user.id }, "Tusharsoni12345")
                            //console.log(token);
                            res.cookie('token', token);
                            res.redirect('/admin/dashboard')
                        }
                        else {
                            //token
                            let token = jwt.sign({ ID: user.id }, "Tusharsoni12345")
                            //console.log(token);
                            res.cookie('token', token);
                            res.redirect('/home')
                        }
                    } else {
                        req.flash('error', 'Email or password is not valid')
                        res.redirect('/')
                    }
                } else {
                    req.flash('error', 'you are not a register user')
                    res.redirect('/')
                }
            } else {
                req.flash('error', 'All field require')
                res.redirect('/')
            }
        } catch (error) {
            console.log(error);
        }
    };
    static logout = async (req, res) => {
        try {
            res.clearCookie("token")
            res.redirect('/');
        } catch (error) {
            console.log(error);
        }
    };
    static profile = async (req, res) => {
        // res.send("hello home")
        try {
            const { name, image, email, mobile, dob } = req.userdata;
            res.render('profile', { n: name, i: image, e: email, m: mobile, dob: dob, });
        } catch (error) {
            console.log(error);
        }
    };
    static updateprofile = async (req, res) => {
        // res.send("hello home")
        try {
            const { id } = req.userdata
            const { name, image, email } = req.body;
            // console.log(req.body);
            // console.log(req.files.image);
            if (req.files) {
                const user = await UserModel.findById(id)
                const imageID = user.image.public_id
                //console.log(imageID)
                //delecting
                await cloudinary.uploader.destroy(imageID)
                //new image upload
                const imagefile = req.files.image
                const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                    folder: "profileimage"
                })
                var data = {
                    name: name,
                    email: email,
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url
                    }
                }
            } else {
                var data = {
                    name: name,
                    email: email,
                }
            }
            await UserModel.findByIdAndUpdate(id, data)
            req.flash('success', "update profile successfully")
            res.redirect("/profile")
        } catch (error) {
            console.log(error);
        }
    };
    static changepassword = async (req, res) => {
        try {
            const { op, np, cp } = req.body;
            const { id } = req.userdata;
            if (op && np && cp) {
                const user = await UserModel.findById(id);
                const isMatched = await bcrypt.compare(op, user.password);
                console.log(isMatched);
                if (!isMatched) {
                    req.flash("error", "current password is incorrect");
                    res.redirect("/profile");
                } else {
                    if (np != cp) {
                        req.flash("error", "password does not match");
                        res.redirect("/profile");
                    } else {
                        const newHashPassword = await bcrypt.hash(np, 10);
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword,
                        });
                        req.flash("success", "password updated successfully");
                        res.redirect("/");
                    }
                }
            } else {
                req.flash("error", "all fields are required");
                res.redirect("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = FrontController