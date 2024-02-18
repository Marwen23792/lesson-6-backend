const User=require('../models/userModel');
const multer = require ('multer');

let filename= '';

const mystorage = multer.diskStorage({
destination : './uploads',
filename: (req, file, callback) => {


  //creation of unique file name 
  let date = date.now();
  let fl= date+'.'+file.mimetype.split('/') [1];
  callback(null,fl);
  filename=fl; //pour qu'on puisse sauvegarder le nom du fichier dans la databse 
}

})

const upload=multer ({storage:mystorage});



exports.addUser=async(req,res)=>{
    try{
//upload file 
//test par rapport au dossier upload
    upload.single('image')(req, res, async function (err){
    if (err instanceof multer.MulterError){

      return res.status(500).json({message:err})
    }
    else if(err){
    return res.status(500).json({message:err})
    }
    const newUser=new User(req.body) ;
    newUser.imageURL=filename;
    console.log("newUser",newUser)
    })
       // console.log("req.body",req.body)

        const savedUser=await newUser.save();
        res.status(201).json(savedUser)
    }
    catch(err){
        res.status(500).json({message:err})
    }
}

exports.allUsers=async(req,res)=>{
    try {
        const usersList = await User.find();
        res.status(200).json(usersList);
      } catch (error) {
        res.status(500).json({ message: error });
      }
}


exports.singleUser=async(req,res)=>{
    try{
        //const userSearched = await User.findById(req.params.id)
        const userSearched = await User.findOne({_id:req.params.id})
       console.log("userSearched",userSearched); 
       console.log("!userSearched",!userSearched); 
        if (!userSearched) {
            res.status(404).json({ message: "User not found check the id !!!! " });
          } else {
            res.status(200).json(userSearched);
          }
    }catch(err){
        res.status(500).json({message:err})
    }
}

exports.editUser=async(req,res)=>{
    try {
        const userId = req.params.id;
        const userExist = await User.findById(userId);
        if (!userExist) {
          res.status(404).json({ message: "User not found check the id !!!! " });
        } else {
          const newUserData = req.body;
          await User.findByIdAndUpdate(userId, newUserData, { new: true });
          res.status(200).json("user updated sucessfully");
        }
      } catch (error) {
        res.status(500).json({ message: error });
      }
}
exports.deleteUser=async(req,res)=>{
    try {
        const userId = req.params.id;
        const userExist = await User.findById(userId);
        if (!userExist) {
          res.status(404).json({ message: "User not found check the id !!!! " });
        } else {
          await User.findByIdAndDelete(userId);
          const usersList = await User.find();
          res.status(200).json(usersList);
        }
      } catch (error) {
        res.status(500).json({ message: error });
      }
}