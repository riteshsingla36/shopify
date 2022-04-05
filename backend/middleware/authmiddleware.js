const Jwt = require("jsonwebtoken")



const authenticator = async (req, res, next) => {
    const token = req.headers["token"]
    if (token) {
        Jwt.verify(token, process.env.JWT_KEY, (err, valid) => {
            if (err) {
                res.status(401).json({ error: "some error occured" })
            }
            else {
                next()
            }
        })
    }
    else {
        res.status(400).json({ error: "Please Provide authentication Token" })
    }
}

module.exports = authenticator