

class ApiResponse {
    constructor(success, message, data = null, statusCode = 200) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }

    static successResponse(data, message = 'Request successful', statusCode = 200) {
        return new ApiResponse(true, message, data, statusCode);
    }

    static errorResponse(message = 'Something went wrong', statusCode = 500) {
        return new ApiResponse(false, message, null, statusCode);
    }
}

export default ApiResponse;
