class Response {
    constructor(res, status, data) {
      return res.status(status).json({
        status: status,
        message: "Success",
        data: data,
      });
    }
  }

  class Error {
    constructor(status, error) {
      this.status = status;
      this.error = error;
    }
  }

  module.exports = { Response, Error }