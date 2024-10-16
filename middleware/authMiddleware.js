const jwt = require ('jsonwebtoken');

//webtoken to access the page
const  verifyToken= (req,res,next) =>{
    const authHeader = req.headers.authorization;
    // const token = req.header('Authorization').replace('Bearer ', '');
    if(!authHeader)
        return res.status(401).json({message:'No token authorization denied'});
    const token = authHeader.split(' ')[1];
    


    try{
        const decoded = jwt.verify(token,process.env.JWT_SECKRETKEY);
        req.user = decoded;

        next();
    
        // res.json({message:`welcome ${decoded.username} to the chekout page`});

    }catch(error){
        res.status(401).json({message:'invalid token'})
    }
  
}
module.exports=verifyToken