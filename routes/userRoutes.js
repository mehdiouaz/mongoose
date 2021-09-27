const express=require("express");

//routes tjiblik les fonctions eli selon el path eli hatithoulha//


const router=express.Router();
const Person=require("../Models/personSchema");

//Create Many Records with model.create()//

 const arrayofpeople =[
   { name: "mehdi" , age : 28 , favouriteFood :["couscous","pizza"]},
   { name: "Karim" , age : 35 , favouriteFood :[ "ijja","lift"]},]


Person.create(arrayofpeople); 


//Use model.find() to Search Your Database//
 router.get("/getpersonbyname/:name",(req,res)=>{
     Person.find({name:req.params.name},(err,data)=>{
         if (err) throw err;
         else 
         res.json(data);
     });
 });

 /*Use model.findOne() to Return a Single Matching Document from Your Database*/

 router.get("/getpersonbyfood/:food",(req,res)=>{
     Person.findOne({favouriteFood:req.params.food},(err,data)=>{
         if (err) throw err;
         elseres.json(data);
     });
 });

 /*Use model.findById() to Search Your Database By _id */
 router.get("/getpersonbyid/:id",(req, res) => {
    Person.findById({_id:req.params.id},(err,data)=>{ 
        if (err) throw err;
        else 
        res.json(data);
    });
   });

   /*Perform Classic Updates by Running Find, Edit, then Save */
   router.put("/edit/:Id", (req, res) => {
    Person.findById(req.params.Id, (err, data) => {
      if (err) {
        throw err
      } else {
      data.favouriteFood.push("baguette farcie")
          data.save((err,person)=>{
            if (err) throw err;
            else 
            res.json(person)

        });
      }
    });
  });
  /*Perform New Updates on a Document Using model.findOneAndUpdate()*/
  
  router.put("/findedit/:Id", (req, res) => {
    Person.findOneAndUpdate({_id:req.params.Id}, {$set: {age:1000000}}, {new: true}, function(err,doc) {
      if (err) { throw err; }
      else { res.send("Updated"); }
    });  
    });

    /*Delete One Document Using model.findByIdAndRemove*/

    router.delete("/delete/:Id",(req, res)=> {
        Person.findByIdAndRemove(req.params.Id, function (err,data) {
         if (err) throw err;
         res.send("deleted");
        });
       });


       /*MongoDB and Mongoose - Delete Many Documents with model.remove()*/


       router.delete("/deletemany/:name",(req, res)=> {
        Person.remove({name:req.params.name}, function(err){
          if(err) throw err;
          else
          res.send("deleted")
      });
       });

       /*Chain Search Query Helpers to Narrow Search Results*/

       router.get("/listpeople", (req, res) => {
        Person.find({ favouriteFood: { $all: ["pizza"] } })
          .sort({ name: "asc" })
          .limit(2)
          .select("-age")
          .exec((err, data) => {
           if (err) throw err 
           else 
           res.json(data)
          });
      });


module.exports= router;
