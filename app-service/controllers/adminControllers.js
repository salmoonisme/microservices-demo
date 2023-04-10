const { Response, Error } = require('../middleware/response');


class AdminController {
    static async get(req, res, next) {
        try {
          const data = 'Success get'
          return new Response(res, 200, data);
        } catch (error) {
          next(error);
        }
      }
}

module.exports = AdminController;