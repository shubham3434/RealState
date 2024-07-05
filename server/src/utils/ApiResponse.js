class ApiResponse{
    constructor(
        statuscode=200,
        data,
        message="success"
    ){
        this.statuscode = statuscode
        this.data = data,
        this.message = message
    }
}

export {ApiResponse}

