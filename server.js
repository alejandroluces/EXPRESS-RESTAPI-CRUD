const express = require("express")
const morgan = require("morgan")

let products =[{
    id:1,
    producto: "lactop",
    price: 120
}]


const app = express()

app.use(express.json())
app.use(morgan("dev"))
//Enviare una peticion GET y respondere con un [  ]
app.get("/producs", (req,res) => {    
    res.json(products)
})




app.post("/producs", (req,res) => {
    const newProduc= {id:products.length + 1 ,...req.body }
    products.push(newProduc)
    res.send(newProduc)
})




app.put("/producs", (req,res) => {
    res.send("Actualizando productos")
})

app.delete("/producs/:id", (req,res) => {

    const findProducID = products.find((item)=> item.id === Number(req.params.id))
    console.log(findProducID);
    
    if(!findProducID ){
        return res.status(404).json({
            message: "Produc NO found"
        })
    }

    products = products.filter((item) => item.id !== Number(req.params.id))
    res.sendStatus(204)
})

app.get("/producs/:id", (req,res) => {
    console.log(req.params.id);
    const findProducID = products.find((item)=> item.id === Number(req.params.id))
    
    if(!findProducID){
        return res.status(404).json({
            message: "Produc NO found"
        })

    }
    console.log(findProducID);
    res.json(findProducID)
})


app.listen(3000)
console.log(`Server on port ${3000}`);
