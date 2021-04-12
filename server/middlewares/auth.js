import jwt from 'jsonwebtoken';

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    
    if(bearerHeader!==undefined){
        
        const bearerToken = bearerHeader.split(" ")[1];
        // console.log(`Bearer : ${bearerToken}`);
        req.token = bearerToken;
        // console.log(`request token : ${req.token}`);
        jwt.verify(bearerToken, 'secret-key', function(error, decodedData){
            if(error){
                res.status(403).json({
                    ok : false,
                    message : 'Denegate'
                });
            }else{
                req.dataUser = decodedData;
                next();
            }
        });
    }else{
        res.status(403).json({
            ok : false,
            message : 'denegate: invalid header'
        });
    }
}

export default verifyToken;