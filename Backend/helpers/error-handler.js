function errorHandler(err,req,res,next)
{
    //Unauthorized Error
    if(err.name === 'UnauthorizedError'){
        return res.status(401).json({message:"the user not authorized"});
    }

    //validation error
    if(err.name === 'validationError'){
        return res.status(401).json({message:err})
    }

    //default error
    //return res.status(500).json({message:'default error'});
}
module.exports = errorHandler;