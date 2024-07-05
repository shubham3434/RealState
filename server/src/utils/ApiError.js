class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong int Apierror class",
    ){
        super(message)
        this.message= message
        this.statusCode = statusCode
        this.success = false
    }
}

export {ApiError}

