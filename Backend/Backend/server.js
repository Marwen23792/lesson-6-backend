const express = require("express");
const mongoose = require("mongoose");

// appel au dotenv 
require('dotenv').config()

const app = express();
app.use(express.json());


//impportation of routes 
const userRoutes=require('./routes/userRoutes');




mongoose.connect(process.env.DATABASE,{useNewUrlParser: true,});



//ROUTES MIDDLEWARE 
app.use('/apiUsers',userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running... on PORT ${process.env.PORT}`);
});