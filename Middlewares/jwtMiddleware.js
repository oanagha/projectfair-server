const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddlware");
    const token = req.headers["authorization"].split(" ")[1]
    console.log(token);
    
    if (token) {
        try{
            const jwtResponse = jwt.verify(token, process.env.SECRET_KEY)
        console.log(jwtResponse);
        req.userId = jwtResponse.userId
        next()
        }catch(err){
            res.status(400).json("Authorization  failed ..Please Login!!")
        }
    } else {
        res.status(404).json("Authorization  failed ..Token is missing ")
    }

   
}

module.exports = jwtMiddleware