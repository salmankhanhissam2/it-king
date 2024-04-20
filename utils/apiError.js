class apiError extends Error{
    constructor(
        statuscode,
        message = "something went wrong",
        errors = [],
        stack = ""

    ){
        super(message)
        this.status = statuscode;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor);
        }

    }
}

module.exports = {apiError};