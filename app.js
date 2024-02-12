const express = require('express')
const app = express() //method
const port = 13000
const web = require('./routes/web')
const connectdb = require('./db/connectdb')
//conect flash and session
const session = require('express-session')
const flash = require('connect-flash')//use for flash message
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');

//fileupload
app.use(fileupload({ useTempFiles: true}));

//token get
app.use(cookieParser());

//messages
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 60000},
  resave: false,
  saveUninitialized: false,
}));
//flash message
app.use(flash());

//connectdb
connectdb();

//data get object
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}));

//router load
app.use('/',web)

//css image link
app.use(express.static('public'))

//ejs set html
app.set('view engine', 'ejs')

//server create
app.listen(port, () => {
  console.log(`server start localhost: ${port}`)
})