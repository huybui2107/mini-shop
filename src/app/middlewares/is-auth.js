const jwt = require('jsonwebtoken');


module.exports = {
    verifyToken : (req, res, next) =>{
        const token = req.get('Authorization');
        if(!token) {
            return res.status(401).json({
                message : "You're not authenticated"
            })
        }
        
        const access_token = token.split(' ')[1];
        let decodedToken ;
        console.log(access_token);
        try {
            decodedToken = jwt.verify(access_token,process.env.JWT_ACCESS_KEY);
            
        } catch (error) {
            return res.status(500).json({
                message : error.message + 'huy'
            })
        }
        if (!decodedToken) {
          return  res.status(403).json("Token is not valid!");
           
        }
        const user = {
            id : decodedToken.id,
            isAdmin : decodedToken.isAdmin
        }
        req.user= user;
        next();
    },
    verifyTokenAndAdmin : (req, res, next) => {
        module.exports.verifyToken(req, res, () => {
          if (req.user.isAdmin) {
            next();
          } else {
            res.status(403).json("You're not allowed to do that!");
          }
        });
      }
}