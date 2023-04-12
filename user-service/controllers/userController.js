class UserController {
    static async getUser(req, res, next) {
        res.send('anjay')
    }
}

module.exports = UserController