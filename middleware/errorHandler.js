const {constants}=require("../constants");
const errorHandler=(err,req,res,next)=>{
const statusCode=res.statusCode ? res.statusCode:500;


switch(statusCode){
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation Failed",message: err.message,stackTrace:err.stack});
        break;
    case constants.NOT_FOUND:  
        res.json({title:"Not found",message: err.message,stackTrace:err.stack});

    case constants.FORBIDEN:
        res.json({title:"Forbiden",message: err.message,stackTrace:err.stack});
        break;
    case constants.UNAUTHORISED:
        res.json({title:"Unauthorised",message: err.message,stackTrace:err.stack});
        break;
    case constants.SERVER_ERROR:
        res.json({title:"Server error",message: err.message,stackTrace:err.stack});
        break;

        default:
            console.log("No error , All good");
            break;
}


};
module.exports=errorHandler;
