const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    
    const token = req.header('x-auth-token'); //get token from header

    if(!token) { //check if there's no token
        return res.status(401).json({ msg: 'No token, authorization denied!' });
    }

    try { // Verifying token
        const decoded = jwt.verify(token, config.get('jwtSecret')); //decoding the token

        req.user = decoded.user; //set the decoded value of the user and the payload
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Token is not valid!'});
    } 
}