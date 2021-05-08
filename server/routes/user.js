import express from 'express';
import verifyToken from '../middlewares/auth.js';
import getConnection from '../database/db.js';

const router = express.Router();

//Get profile user by id
router.get('/user/profile', verifyToken, async function(req, res){
    const body = req.body;
    try {
        const idUser = req.dataUser.user.id;
        const email = req.dataUser.user.email;
        const userName= req.dataUser.user.username;
        const connection = await getConnection();

        const [rows] = await connection.execute(
            'SELECT firstname, lastname, username FROM user WHERE id=? AND email=? AND username=? ',
            [idUser, email, userName]
        );
        console.log(`${rows}`);
        
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
        const email = req.dataUser.user.email;
        const connection = await getConnection();
        const [rows] = await connection.query(
            'UPDATE user SET password = ?  WHERE id = ? AND email=?',
            [body.password, idUser, email]
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

router.delete('/user', verifyToken, async function(req, res){
    
    try {
        
        const idUser = req.dataUser.user.id;
        
        const connection = await getConnection();
        
        const [rows] = await connection.query(
            'DELETE FROM user WHERE id = ?',
            [idUser]
        );
        if(rows !== undefined && rows !== null && rows['affectedRows'] !== undefined && rows['affectedRows'] !== 0){
            res.json({
                ok : true,
                message : 'success',
                data : 'delete'
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'error: syntax error, not delete'
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