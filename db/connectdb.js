const mongoose =require("mongoose");
const Live_URL = 'mongodb+srv://tusharsoni628:Ram1234@cluster0.jm5l1dm.mongodb.net/practicePortal?retryWrites=true&w=majority'
const Local_URL = 'mongodb://127.0.0.1:27017/practice123'

const connectdb =() => {
    mongoose.connect(Live_URL)
    .then(()=>{
        console.log("connecting sucess")
    }).catch(()=>{
        console.log("error")
    })
};

module.exports = connectdb