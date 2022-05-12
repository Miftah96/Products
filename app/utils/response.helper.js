const Response = {};

Response.success = (data) => {
    
    const res = {
        status: "Success",
        message: "Success",
        data
    }

    return res;
}

Response.notFound = (service, id) => {
    
    const res = {
        status: "Not Found",
        message: `${service} with ID ${id} Not Found`,
        data: {}
    }

    return res;
}

Response.badRequest = (body) => {
    
    const res = {
        status: "Bad Request",
        message: `${body} cannot be null`,
        data: {}
    }

    return res;
}

Response.created = (data) => {
    
    const res = {
        status: "Success",
        message: `Success`,
        data
    }

    return res;
}

module.exports = Response;