const mongoose =  require('mongoose');

const userShema = mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true}
})
module.exports = mongoose.model('Users',userShema);