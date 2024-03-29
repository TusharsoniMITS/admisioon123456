const express = require('express')
const FrontController = require('../controller/FrontController')
const router = express.Router()
const checkUserAuth =require('../middleware/auth')
const  CourseController  = require('../controller/CourseController')
const AdminController = require('../controller/AdminController')

//route
// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

const authRoles = require('../middleware/adminRole')
const isLogin = require('../middleware/isLogine')

router.get('/',isLogin,FrontController.login)//req
router.get('/register',FrontController.register)//req
router.get('/home',checkUserAuth,FrontController.home)//req
router.get('/dashboard',checkUserAuth,FrontController.dashboard)//req
router.get('/about',checkUserAuth,FrontController.about)//req
router.get('/contact',checkUserAuth,FrontController.contact)//req

//data insert
router.post("/insertreg",FrontController.insertReg)
router.post("/vlogin",FrontController.vlogin)
router.get("/logout",FrontController.logout)
router.get("/profile",checkUserAuth,FrontController.profile)
router.post("/updateprofile",checkUserAuth,FrontController.updateprofile)
router.post("/changepassword",checkUserAuth,FrontController.changepassword)

// // forget password
router.get('/forget',FrontController.forget)
router.post('/forget',FrontController.forgetverify)

// // router.get("/forgetpassword",FrontController.forget)
// router.post('/forget',FrontController.forgetverify)
router.get('/reset-password',FrontController.reset_Password)

// // router.get('/reset-password',FrontController.reset_Password)
router.post('/reset_Password1',FrontController.reset_Password1)




//admin controller
router.get("/admin/dashboard",checkUserAuth,authRoles('admin'),AdminController.dashboard)
router.post("/admin/update_status/:id",checkUserAuth,AdminController.update_status)





//display course
// router.post("/course_insert",checkUserAuth,CourseController.CourseInsert)

//course controller
router.post('/course_insert',checkUserAuth,CourseController.CourseInsert)
router.get("/course_display",checkUserAuth,CourseController.courseDisplay)
router.get("/course_view/:id",checkUserAuth,CourseController.courseview)
router.get("/course_edit/:id",checkUserAuth,CourseController.courseEdit)
router.get("/course_delete/:id",checkUserAuth,CourseController.courseDelete)
router.post("/course_update/:id",checkUserAuth,CourseController.courseupdate)






module.exports =router