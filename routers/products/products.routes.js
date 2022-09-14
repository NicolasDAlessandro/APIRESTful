
const express = require('express');
const { readFile,writeFile } = require('fs/promises');
const  API  = require('../../api/api.js')


const api = new API;
const router = express.Router();


router.get('/', async (req,res) =>{
    const products = await api.getProduct();
    return res.json(products)
})

router.get('/:id',async (req,res) =>{
    const { id } = req.params;
    const product = await api.getById(id);
    return res.json(product)
});

router.post('/', async (req,res)=>{
    const {name, price, thumbnail} = req.body;
    const newProduct = await api.saveProduct(name,price,thumbnail);
    return newProduct 
});

router.put('/:id', async (req,res) =>{
    const { params: { id }, body: { name, price, thumbnail} } = req;
    if ( !name || !price || !thumbnail) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
      };
    const saveProducts = await readFile('./data/products.json','utf-8')
    const productsList = JSON.parse(saveProducts);
    const productIndex = productsList.findIndex((prod) => prod.id === +id);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product id: ${productId} doesn't match!`});
    const newProduct = {
        ...productsList[productIndex],
        name,
        price,
        thumbnail
    };
    productsList[productIndex] = newProduct;
    writeFile('./data/products.json',JSON.stringify(productsList));
    return res.json({ success: true, result: newProduct});
    
})


module.exports = router;
