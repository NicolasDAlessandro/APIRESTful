const {readFile,writeFile} = require('fs/promises');

class API{
    constructor(){
        this.products = [];
    }

    async getProduct(){
        try {
            this.products = []
            const saveProducts = await readFile('./data/products.json','utf-8')
            const productsList = JSON.parse(saveProducts);
            this.products.push(...productsList)
            return this.products
        } catch (error) {
            return error
        }
    }

    async getById(id){
        try {
            const saveProducts = await readFile('./data/products.json','utf-8')
            const productsList = JSON.parse(saveProducts);
            const filterProduct = productsList.find(prod => prod.id == id);
            return filterProduct
        } catch (error) {
            return error
        }
    }

    async saveProduct(name, price, thumbnail){
        try {
            const saveProducts = await readFile('./data/products.json', 'utf-8');
            const products = JSON.parse(saveProducts);
            const newProduct = { id: products.length + 1, name: name, price: price, thumbnail: thumbnail} 
            products.push(newProduct);
            await writeFile('./data/products.json',JSON.stringify(products));
            return newProduct
       } catch (error) {
            return error
       }
    }

    async updateProduct(id,name,price,thumbnail){
        try {
            const saveProducts = await readFile('./data/products.json','utf-8')
            const productsList = JSON.parse(saveProducts);
            const productIndex = productsList.findIndex((prod) => prod.id == id);
            if (productIndex < 0) return res.status(404).json({ success: false, error: `Product id: ${productId} doesn't match!`});
            const newProduct = {
                ...productsList[productIndex],
                name,
                price,
                thumbnail
            };
            productsList[productIndex] = newProduct;
            await writeFile('./data/products.json',JSON.stringify(productsList));
            return newProduct
        } catch (error) {
            return error.message
        }
    }
    async deleteByID (id){
        try {
            const saveProducts = await readFile('./data/products.json','utf-8')
            const productsList = JSON.parse(saveProducts);
            const newList = productsList.filter(p => p.id != id);
            this.products = [...newList];
            await writeFile('./data/products.json',JSON.stringify(newList));
            return newList
        } catch (error) {
            return {error: error.message}
        }
    }
}

module.exports = API;