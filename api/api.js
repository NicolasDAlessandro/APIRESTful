const {readFile,writeFile} = require('fs/promises');

class API{
    constructor(){
        this.products = [];
    }

    async getProduct(){
        try {
            const saveProducts = await readFile('./data/products.json','utf-8')
            const productsList = JSON.parse(saveProducts);
            return productsList
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
            const productsList = JSON.parse(saveProducts);
            const newProduct = productsList.length === 0 ? { id:1, name, price, thumbnail} : {id: productsList.length + 1, name, price, thumbnail}
            productsList.push(newProduct);
            writeFile('./data/products.json',JSON.stringify(productsList));
            return newProduct
       } catch (error) {
            return error
       }
    }

    updateProduct(id,prod){

    }
    async delete (id){
        try {
            const productsList = await readFile('./data/products.json','utf-8');
            const parseProducts = [...JSON.parse(productsList)];
            this.products = [...productsParse.filter((prod) => prod.id !== id)];
            writeFile('./data/products,json',this.products);
            return this.products
        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = API;