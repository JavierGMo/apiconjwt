import express from 'express';
import jwt from 'jsonwebtoken';
import getConnection from '../database/db.js';

const router = express.Router();

//https://www.youtube.com/watch?v=Xd2pv2ZSOzs

router.post('/login', async function(req, res){
    
    

    try {
        const body = req.body;
        console.log(body);
        const connection = await getConnection();
        
        const [rows] = await connection.execute(
            'SELECT id, firstname, lastname, username, email FROM user WHERE (username=? OR email=?) AND password=?',
            [body.user, body.user, body.password]
        );


        if(rows !== undefined && rows !== null && rows.length!==0){
            
            //Creamos un token para el usuario
            jwt.sign({user : rows[0]}, 'secret-key', (err, token)=>{
                if(err){
                    res.status(500).json({
                        ok : false,
                        message : `Error: ${err}`
                    });
                }else{
                    res.json({
                        ok : true,
                        message : 'success',
                        token : token
                    });
                }
            });
        }else{
            
            res.status(404).json({
                ok : false,
                message : 'Este usuario no existe.'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok : false,
            message : `Error : ${error}`
        });
    }

});


export default router;
