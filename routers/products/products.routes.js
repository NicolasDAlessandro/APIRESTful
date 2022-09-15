
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
    return res.json(newProduct)
});

router.put('/:id', async (req,res) =>{
    const { params: { id }, body: { name, price, thumbnail} } = req;
    if ( !name || !price || !thumbnail) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
      };
    const newProduct = await api.updateProduct(id,name,price,thumbnail);
    return res.json({ success: true, result: newProduct});
    
})

router.delete('/:id', async (req,res) =>{
    const { id } = req.params;
    const products = await api.deleteByID(id);
    return res.json({Products:products})
})

module.exports = router;
