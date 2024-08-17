const mongoose = require('mongoose')
const UsrSchema = new mongoose.Schema({
//donor
    dname: String,
    demail: String,
    dblood:String,
    dmob:String,
//request
   rname: String,
   remail: String,
   rblood:String,
   rmob:String
})
const UsrModel = mongoose.model("usr", UsrSchema)
module.exports = UsrModel

