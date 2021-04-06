require ('dotenv').config()
const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = req.body.token
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
        next()
        if(decoded.email === req.body.email) {
            return next()
        }
        else {
            return res.status(401).json({
            message: 'Auth failed'
        })}
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}