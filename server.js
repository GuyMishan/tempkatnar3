const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const path = require('path')
require('dotenv').config();


//app config
const app =express()

//middlware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//DB Config
const connection_url = process.env.ATLAS_URI;
mongoose.connect(connection_url,{
    useCreateIndex:true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.once("open",() => {
    console.log("dbconected");
})


const tipulRoutes = require("./routes/tipul");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const egadtypeRoutes = require('./routes/egadtype');
const ratingRoutes = require('./routes/rating');


app.use('/api',tipulRoutes)
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', egadtypeRoutes);
app.use('/api', ratingRoutes);




if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
      res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });  
  }
//listen
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});