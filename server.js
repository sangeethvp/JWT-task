const express = require('express');
const connectDB=require('./config/db');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app =express();

const port = process.env.PORT ||4000

connectDB();

//middleware

app.use(express.json());

//routes
app.use('/api/users',userRoutes);

app.listen(port,()=>{
    console.log('server is running ')
})
