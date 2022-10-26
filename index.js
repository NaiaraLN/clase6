const express = require('express');
const server = express();
const fs = require('fs')

server.get('/productos', (req, res) => {
    res.send(product)
})

server.get('/productosRandom', (req, res) => {
    const prodRandom = product[Math.floor(Math.random() * product.length)];
    res.send(prodRandom)
})

server.on("error", (error) => console.log(`Error en el servidor ${error}`));

let product;

class Contenedor {
    constructor (name){
        this.fileName = name
    }

    save = async (product) => {
        try {
            if (fs.existsSync(this.fileName)) {
                let allProducts = await this.getAll()
                let lastId = allProducts.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
                let newProduct = {
                    id: lastId + 1,
                    ...product
                }
                allProducts.push(newProduct)
                await fs.promises.writeFile(this.fileName, JSON.stringify(allProducts));
                return newProduct.id
            } else {
                let newProduct = {
                    id: 1,
                    ...product
                }
                await fs.promises.writeFile(this.fileName, JSON.stringify([newProduct]))
                return 1
            }
        } catch (error) {
            throw 'No se pudo guardar' + error;
        }
    }

    getAll = async () => {
        try {
            if (fs.existsSync(this.fileName)) {
                const products = await fs.promises.readFile(this.fileName)
                product = JSON.parse(products)
                return product
            }
        } catch (error) {
            throw "No se encontró el archivo" + error;
        }
    }

}

let product1 = {
    title: "Iced Latte",
    price: 210,
    thumbnail:"https://e7.pngegg.com/pngimages/758/88/png-clipart-cafe-iced-coffee-latte-starbucks-coffee-cream-food-thumbnail.png"
}
let product2 = {
    title: "Matcha green tea",
    price: 250,
    thumbnail:"https://e1.pngegg.com/pngimages/513/216/png-clipart-starbucks-coffe-in-starbucks-coffee-matcha-green-tea-coffee-cup-thumbnail.png"
}
let product3 = {
    title: "Unicorn Frappuccino",
    price: 275,
    thumbnail:"https://e7.pngegg.com/pngimages/24/913/png-clipart-starbucks-plastic-cup-coffee-unicorn-frappuccino-starbucks-drink-starbucks-food-magenta-barista-thumbnail.png"
}

let file = new Contenedor("productos.txt")

getMethods = async () => {
    //await file.save(product1)
    //await file.save(product2)
    //await file.save(product3)
    await file.getAll()
}

getMethods()

server.listen(8080, () => {
    console.log("Listening on port 8080")
})