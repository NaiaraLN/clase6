const express = require("express");
const { Router } = express;
const path = require("path");
const app = express();
const routerProducts = Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))
app.use("/api/productos", routerProducts);

let listProduct = [];

app.get("/", (req, res) => {
    res.send("index.html");
});

routerProducts.get("/", (req, res) => {
    res.json(listProduct);
});

routerProducts.post("/", (req, res) => {
    let product = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };
    if (listProduct.length >= 1) {
        let lastId = listProduct.reduce((acc, item) => item.id > acc ? acc = item.id : acc, 0)
        let newProduct = {
            id: lastId + 1,
            ...product
        }
        listProduct.push(newProduct);
        res.json(listProduct);
    } else {
        let newProduct = {
            id: 1,
            ...product
        }
        listProduct.push(newProduct);
        res.json(listProduct);
    }

});

routerProducts.get("/:id", (req, res) => {
    let id = parseInt(req.params.id)
        if(id >= 1 && id <= listProduct.length) {
            let product = listProduct.find((el) => el.id === id ? el : '')
            res.json(product)
        }
        else {
            res.send({error : 'Producto no encontrado'})
        }
});

routerProducts.put("/:id", (req, res) => {
    let id = parseInt(req.params.id)
    let index = listProduct.findIndex((el) => el.id == id);
    let newProduct = req.body;

    if (index >= 0) {
        listProduct[index] = newProduct;
    }
    res.json(listProduct);
});

routerProducts.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let index = listProduct.findIndex((el) => el.id == id);

    if (index >= 0) {
        listProduct.splice(index,1)
    }
    res.json(listProduct);    
});

app
    .listen(8080, () => {
        console.log("Server running");
    })
    .on("error", () => {
        console.log("Ha ocurrido un error");
    });