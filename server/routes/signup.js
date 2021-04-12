import express from 'express';
import jwt from 'jsonwebtoken';
import getConnection from '../database/db.js';


const router = express.Router();

router.post('/signup', async function(req, res){
    const body = req.body;
    try {
        const connection = await getConnection();

        const rows = await connection.query(
            'INSERT INTO user (id, firstname, lastname, username, email, password) VALUES (NULL, ?, ?, ?, ?, ?)',
            [body.firstname, body.lastname, body.username, body.email, body.password]
        );
        console.log(rows);

        res.json({
            ok : true,
            message : 'success'
        });

    } catch (error) {
        /*
            Duplicate record
            code: 'ER_DUP_ENTRY',
            errno: 1062,
        */
        console.error(error);
        if(error['code']!==undefined && error['code'] === 'ER_DUP_ENTRY' ){
            res.status(400).json({
                ok : false,
                message : `ER_DUP_ENTRY`
            });
        }else{
            res.status(500).json({
                ok : false,
                message : `Error : ${error}`
            });
        }
        
    }
});


export default router;