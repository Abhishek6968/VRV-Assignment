const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // For parsing form data (x-www-form-urlencoded)
const cookieParser = require('cookie-parser');
app.use(cookieParser()); // Use cookie-parser middleware
app.use(express.static('public'));

const morgan=require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
const PORT=process.env.PORT
require('./db/connection');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);







app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})