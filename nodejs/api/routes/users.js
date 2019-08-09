const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const nodemailer=require("nodemailer");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
 
async function main(mailId,id){

       
   let crptID=cryptr.encrypt(id);
 
   
  let transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'ganeshharihar1211@gmail.com',
          pass:"Romanr@14498."
      }
  });
  var mailOptions={
      from:'ganeshharihar1211@gmail.com',
      to:mailId,
      subject:'Sending mail via express',
      text:`Click below link to Reset Your password

      http://localhost:4200/auth/changePassword/`+crptID
  }
  transporter.sendMail(mailOptions,function(error,info){
      if(error){
          console.log(error);
      }
      else{
          console.log("Mail send "+info.response);
      }
  });
}

router.get('/:email',(req,res,next)=>{
  console.log('in method');
  const email=req.params.email; 
  User.findOne({email:email})
  .exec()
  .then(result=>{
      if(result){
      main(result.email,result._id)
      res.status(200).json(result),
      console.log(result)}
      else{return res.status(404).json({message:"Not found"})}
  })
  .catch(err=>{
      res.status(404).json({error})
  })
 })
  
router.post('/',(req, res, next) => {
  user = new User({
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    password:req.body.password
  })
  user.save()
  .then((result)=>res.status(201).json({message:'user successfully added',user:result}))
  .catch(error=>console.log(error))

});

router.patch('/:id',(req,res,next)=>
{
  console.log('in method');
  const cryptId=req.params.id;
  const id=cryptr.decrypt(cryptId);

  User.findOne({password:id})
  .exec()
  .then(result=>{
      if(result){
        if(id === result.password)
        {
          const password=req.body.newPass;
        User.updateOne({ _id : id},{$set:{password:password}})
        .select()
        .exec()
        .then(result=>
        {
          res.status(201).json({result});    
        })
        .catch(err=>{
          res.status(500).json({error:err});
        });
        }
        else
        {
          confirm('link expired');
        }
        
      }
      else{return res.status(404).json({message:"Not found"})}
  })
  .catch(err=>{
      res.status(404).json({error})
  })

  
})



router.post('/:email',(req,res,next)=>
{ 
  const email = req.params.email;
  User.findOne({email:email})
  .exec()
  .then((result)=>
  {
    if(result===null)
    {
      res.status(401).send('Record Not Found..!');
    }
    else
    {
      if(req.body.password !== result.password)
        res.status(401).send('email or password is invalid');
      else
      {
        const token = jwt.sign(
          {
              _id : result._id

          },process.env.JWT_KEY,{
              expiresIn:"1h"
          })    
          res.status(200).json({message:'Auth Success',token:token});        
      } 
    }
  })
  .catch((err)=>{
    res.status(401).send('Record Not Found..!')});
  })
    module.exports = router;