import express from 'express';
import verifyToken from '../middlewares/auth.js';
import uploadVideo from '../middlewares/uploadvideo.js';
import getConnection from '../database/db.js';



const router = express.Router();






//Todos los productos
router.get('/products', async function(req, res){
    try {
        const connection = await getConnection();

        const [rows] = await connection.execute('SELECT * FROM product');
        // console.log(rows);
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
        res.status(500).json({
            ok : false,
            message : `Error : ${error}`
        });
    }
});


//Productos filtrados por el iduser, productos suyos
router.get('/products/user', verifyToken, async function(req, res){

    try {
        const connection = await getConnection();
        const idUser = req.dataUser.user.id;
        const [rows] = await connection.execute('SELECT * FROM product WHERE iduser=?', [idUser]);
        // console.log(rows);
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
        res.status(500).json({
            ok : false,
            message : `Error : ${error}`
        });
    }
});

//Buscar producto por nombre
router.get('/products/search/:name', verifyToken, async function(req, res){
    try {
        const connection = await getConnection();
        const nameProduct = `%${req.params.name}%`;
        console.log(nameProduct);
        const [rows] = await connection.query('SELECT * FROM product WHERE name LIKE ?', [nameProduct]);
        // console.log(rows);
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
        res.status(500).json({
            ok : false,
            message : `Error : ${error}`
        });
    }
});

//Buscar producto por id
router.get('/products/:id', verifyToken, async function(req, res){
    try {
        const connection = await getConnection();
        const idProducto = req.params.id;
        
        const [rows] = await connection.execute('SELECT * FROM product WHERE id=?', [idProducto]);
        // console.log(rows);
        if(rows !== undefined && rows.length!==0){
            
            res.json({
                ok : true,
                message : 'success',
                data : rows
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'Error id product: not found products'
            });
        }
    } catch (error) {
        console.error(`Error : ${error}`);
        res.status(500).json({
            ok : false,
            message : `Error id product: ${error}`
        });
    }
});



//Productos por rango: para paginacion
router.get('/products/pagination/range/:pos', async function(req, res){
    try {
        const connection = await getConnection();
        const position = req.params.pos;//Con esto se determina el numero de productos a traer
        const final = position*10;//1->10, 2->20, 3->30, ...
        const begin = final-10;//1->0, 2->10, 3->20
        console.log(`Inicio: ${begin} Final : ${final}`);
        // const begin = req.query.begin;
        // const final = req.query.final;
        
        const [rows] = await connection.execute(
            'SELECT * FROM product LIMIT ? , ?',
            [begin, final]
        );

        // console.log(rows);
        if(rows !== undefined && rows.length!==0){
            res.json({
                ok : true,
                message : 'success',
                data : rows

            });
        }else{
            res.status(404).json({
                ok : false,
                message : `Error: Products not found`
            });
        }
    } catch (error) {
        console.error(`Error : ${error}`);
        res.status(500).json({
            ok : false,
            message : `Error id product: ${error}`
        });
    }
});


//Create product
router.post('/products', [verifyToken, uploadVideo], async function(req, res){
    
    const body = req.body;
    const idUser = req.dataUser.user.id;
    
    try {
        
        const connection = await getConnection();
        const [rows] = await connection.query(
            'INSERT INTO product (id, name, price, pieces, videourl, plan, iduser) VALUES (NULL, ?, ?, ?, ?)',
            [body.name, body.price, body.pieces, idUser]
        );

        // console.log(rows);
        if(rows !== undefined && rows !== null && rows['affectedRows'] !== undefined && rows['affectedRows'] !== 0){
            res.json({
                ok : true,
                message : 'success',
                data : rows['insertId']
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'error: syntax error request'
            });
        }
        

        

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


router.put('/products/buy', verifyToken, async function(req, res){
    const body = req.body;

    const idProducto = body.idproducto;
    const piecesNow = body.pieces;
    const idUser = req.dataUser.user.id;

    try {
        
        const connection = await getConnection();
        const [rows] = await connection.query(
            'UPDATE product SET pieces = ? WHERE id = ?',
            [piecesNow, idProducto]
        );
        // console.log(rows);

        if(rows !== undefined && rows !== null && rows['affectedRows'] !== undefined && rows['affectedRows'] !== 0){
            res.json({
                ok : true,
                message : 'success',
                data : 'update'
            });
        }else{
            res.status(404).json({
                ok : false,
                message : 'error: syntax error, not update'
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

router.delete('/products/:id', verifyToken,async function(req, res){
    const idProduct = req.params.id;
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(
            'DELETE FROM product WHERE id = ?',
            [idProduct]
        );
        // console.log(rows);
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