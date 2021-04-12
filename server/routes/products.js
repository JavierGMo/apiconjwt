import express from 'express';
import verifyToken from '../middlewares/auth.js';
import getConnection from '../database/db.js';

const router = express.Router();

//Todos los productos
router.get('/products', verifyToken, async function(req, res){
    try {
        const connection = await getConnection();

        const [rows] = await connection.execute('SELECT * FROM product');
        console.log(rows);
        if(rows !== undefined && rows.length!==0){
            
            res.json({
                ok : true,
                message : 'success',
                data : rows
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'error: not found products'
            });
        }
    } catch (error) {
        console.error(`Error : ${error}`);
    }
});


//Productos filtrados por el iduser, productos suyos
router.get('/products/user', verifyToken, async function(req, res){

    try {
        const connection = await getConnection();
        const idUser = req.dataUser.user.id;
        const [rows] = await connection.execute('SELECT * FROM product WHERE iduser=?', [idUser]);
        console.log(rows);
        if(rows !== undefined && rows.length!==0){
            
            res.json({
                ok : true,
                message : 'success',
                data : rows
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'error: not found products'
            });
        }
    } catch (error) {
        console.error(`Error : ${error}`);
    }
});

//Buscar producto por nombre
router.get('/product/search/:name', verifyToken, async function(req, res){
    try {
        const connection = await getConnection();
        const nameProduct = `%${req.params.name}%`;
        console.log(nameProduct);
        const [rows] = await connection.query('SELECT * FROM product WHERE name LIKE ?', [nameProduct]);
        console.log(rows);
        if(rows !== undefined && rows.length!==0){
            
            res.json({
                ok : true,
                message : 'success',
                data : rows
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'error: not found products'
            });
        }
    } catch (error) {
        console.error(`Error : ${error}`);
    }
});

//Buscar producto por id
router.get('/product/:id', verifyToken, async function(req, res){
    try {
        const connection = await getConnection();
        const idProducto = req.params.id;
        
        const [rows] = await connection.execute('SELECT * FROM product WHERE id=?', [idProducto]);
        console.log(rows);
        if(rows !== undefined && rows.length!==0){
            
            res.json({
                ok : true,
                message : 'success',
                data : rows
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'error: not found products'
            });
        }
    } catch (error) {
        console.error(`Error : ${error}`);
    }
});

//Crear producto

router.post('/product', verifyToken, async function(req, res){
    
    const body = req.body;
    const idUser = req.dataUser.user.id;
    
    try {
        
        const connection = await getConnection();
        const rows = await connection.query(
            'INSERT INTO product (id, name, price, pieces, iduser) VALUES (NULL, ?, ?, ?, ?)',
            [body.name, body.price, body.pieces, idUser]
        );

        console.log(rows);

        res.json({
            ok : true,
            message : 'success'
        });

        

    } catch (error) {
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