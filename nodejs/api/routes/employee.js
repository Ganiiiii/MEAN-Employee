const express = require('express');
const router = express.Router();
const Employee = require('../model/employee');
const mongoose = require('mongoose');
const multer = require('multer');
const fs =require('fs');
const jwt = require('jsonwebtoken');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log('in name change');
       
        cb(null,'./uploads/');
 
    },
    filename:function(req,file,cb){
        var extension = file.mimetype;
    extension = extension.substring(extension.indexOf("/")+1, extension.length);
    console.log('in name change'); 
    var filename = file.originalname + '-' + Date.now() + "." + extension;
    console.log('in name change',filename);
    cb(null, filename);
            }   
});

const upload = multer({storage:storage});

function verifyToken(req,res,next){

    if(!req.headers.authorization){
       
        return res.status(401).send('Unauthorized request')
    }
    let token=req.headers.authorization.split(' ')[1];
    

    if(token==='null'){
       
        return res.status(401).send('unauthorize request')
    }
     
    let payload =jwt.verify(token,process.env.JWT_KEY);
    
    if(!payload){
        console.log("Payload is not found");
        return res.status(401).send('Unauthorized request')
    }
    console.log("payload is "+payload);
   req.userId=payload.subject;
   next();
    
}




router.get('/', verifyToken,(req,res,next)=>
{
    Employee.find()
    .exec()
    .then(docs=>
        {
            res.status(200).json(docs)
        })
    .catch(error=>res.status(200).json({message:'Users:',Employees:docs}))
})

/*router.post('/',upload.single('img'),(req,res,next)=>
{
    console.log(req.file);
    const employee = new Employee(
    {
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        gender: req.body.gender,
        phone:req.body.phone,
        birthdate:req.body.birthdate,
        qualification: req.body.qualification,
        state: req.body.state,
        city: req.body.city,
        hobbies: req.body.hobbies,
        img:req.body.img.im
    });
    console.log(employee);
    employee.save()
    .then((result)=>
        {
            console.log(result);
            res.status(201).json({
                message:'New User Successfully Registered...!',
                employee: employee
            });
        })
    .catch((error)=>{res.status(404).json({Message:'problem',error:error})});
})*/

router.post('/', verifyToken, upload.single('profiePic'),(req, res, next) => {
    if(req.file)
    {
    employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname ? req.body.fname: '',
        lname: req.body.lname ? req.body.lname: '',
        email: req.body.email ? req.body.email:'',
        phone: req.body.phone ? req.body.phone:'',
        gender:req.body.gender ? req.body.gender:'',
        birthdate:req.body.birthdate,
        qualification:req.body.qualification ? req.body.qualification:'',
        state:req.body.state ? req.body.state:'',
        city:req.body.city ? req.body.city:'',
        hobbies:req.body.hobbies, 
        profiePic:req.file.path,
        zipCode:req.body.zipCode ? req.body.zipCode:'',
        address:req.body.address ? req.body.address:'',
        skills:req.body.skills,
        salary:req.body.salary,
    })
}
else{
    employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        fname: req.body.fname? req.body.fname: '',
        lname: req.body.lname ? req.body.lname: '',
        email: req.body.email ? req.body.email:'',
        phone: req.body.phone ? req.body.phone:'',
        gender:req.body.gender ? req.body.gender:'',
        birthdate:req.body.birthdate,
        qualification:req.body.qualification ? req.body.qualification:'',
        state:req.body.state ? req.body.state:'',
        city:req.body.city ? req.body.city:'',
        hobbies:req.body.hobbies, 
        zipCode:req.body.zipCode ? req.body.zipCode:'',
        address:req.body.address ? req.body.address:'',
        skills:req.body.skills,
        salary:req.body.salary

    })
}
        employee.save().then(result => {
       
        res.status(200).json(
            {
                Message: 'success employee created',
                data: employee
            })
        
    }

    ).catch(err => {
        res.status(404).json({
            error: err
        })
    })

});





router.patch('/:_id',upload.single('profiePic'),(req,res,next)=>
{
    
    const id=req.params._id;
    console.log(req.body);
    const updateOps={};
    updateOps['fname']=req.body.fname;
    updateOps['lname']=req.body.lname;
    updateOps['email']=req.body.email;
    updateOps['phone']=req.body.phone;
    updateOps['gender']=req.body.gender;
    updateOps['birthdate']=req.body.birthdate;
    updateOps['qualification']=req.body.qualification;
    updateOps['state']=req.body.state;
    updateOps['city']=req.body.city;
    updateOps['hobbies']=req.body.hobbies;
    updateOps['zipCode']=req.body.zipCode;
    updateOps['address']=req.body.address;
    updateOps['skills']=JSON.parse(req.body.skills);
    updateOps['salary']=req.body.salary
    if(req.file)
    {
        console.log('file selceted');
        updateOps['profiePic']=req.file.path;
        if(req.body.oldImgPath !== 'undefined')
        {
            console.log('in unlink');
            fs.unlink(req.body.oldImgPath, (err) => {
                if (err) throw err;
                console.log(req.body.oldImgPath+'was deleted');
               });
        }
        
    }
   
   Employee.findOneAndUpdate({ _id : id},{$set:updateOps})
   .select('fname lname email gender _id')
   .exec()
   .then(result=>
    {
        console.log(result);
        if(result)
        {
            res.status(200).json({
            Message:'Employee is updated Successfully',
            request:'GET',
            url:'http://localhost:3000/employee/'+result._id,
            });
        }
        else{  res.status(500).json({error:err});}
    })
    .catch(err=>{
        console.log(err);
        res.status(200).json({error:err});
    });
})


router.delete('/:_id',(req,res,next)=>
{
    const id = req.params._id;
    Employee.findOneAndDelete({_id:id})
    .exec()
    .then((result)=>{ 
        res.status(200).json({message:'User Deleted..!'})})
    .catch((err)=>{
        res.status(401).json({error:err})})
})

router.get('/:_id',(req,res,next)=>
{
    const id = req.params._id;;
    Employee.findOne({_id:id})
    .exec()
    .then((result)=>
    {
    if(result===null)
    {
    res.status(401).json({message:'Record Not Found..!',error:err});
    }
    else
    {
        res.status(200).json({Employees:result});
    }
})
.catch((err)=>{
    res.status(401).json({message:'Record Not Found..!',error:err})});
})

    module.exports = router;