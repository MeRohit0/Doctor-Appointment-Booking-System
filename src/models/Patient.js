import mongoose from "mongoose";

const patientScheme = new mongoose.Schema({
    name : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    phone: {type : String, required : true}
},{timestamps: true});

const Patient = mongoose.model('Patient', patientScheme);

export default Patient;