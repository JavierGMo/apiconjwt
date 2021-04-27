import express from 'express';
import verifyToken from '../middlewares/auth.js';
import getConnection from '../database/db.js';

const router = express.Router();

//Get profile user by id
router.get('/user/profile', verifyToken, async function(req, res){
    const body = req.body;
    try {
        const connection = await getConnection();

        const [rows] = await connection.execute(
            'SELECT firstname, lastname, username FROM user WHERE (email=? OR username=?) AND password=?',
            [body.user, body.user, body.password]
        );
        if(rows.length>0){
            res.json({
                ok : true,
                message : 'success',
                data : rows[0]
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'User not found'
            });
        }
        
    } catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).json({
            ok : false
        });
    }
});

//User change password
router.put('/user/changepassword', [verifyToken], async function(req, res){
    const body = req.body;
    try {
        const idUser = req.dataUser.user.id;
        const connection = await getConnection();
        const [rows] = await connection.query(
            'UPDATE user SET password = ?  WHERE id = ? AND email=?',
            [body.password, idUser, body.email]
        );
        console.log(rows);
        res.json({
            ok : true,
            message : 'success'
        });
    } catch (error) {
        console.error(`Error : ${error}`);
        res.status(500).json({
            ok : false,
            message : 'Server error'
        });
    }
});

//User update
router.put('/user/update', verifyToken, async function(req, res){
    const body = req.body;
    try {
        const idUser = req.dataUser.user.id;
        
        const connection = await getConnection();
        
        const [rows] = await connection.query(
            'UPDATE user SET firstname = ? , lastname = ? WHERE id = ? AND username=?',
            [body.firstname, body.lastname, idUser, body.username]
        );
        
        res.json({
            ok : true,
            message : 'success'
        });
    } catch (error) {
        console.error(`Error : ${error}`);
        res.status(500).json({
            ok : false,
            message : 'Server error'
        });
    }
});

export default router;