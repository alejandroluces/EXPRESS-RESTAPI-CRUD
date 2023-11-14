const express = require("express")
const morgan = require("morgan")

let products =[{
    id:1,
    producto: "lactop",
    price: 120
}]

const app = express()

//Settings
app.set("case sensitive routing", true)
app.set("appName", "Express Course")
app.set("port", 4000)


//Middlewares
app.use(express.json())
app.use(morgan("dev"))

//Routes
//Enviare una peticion GET y respondere con un [  ]

app.get("/producs", (req,res) => {    
    res.json(products)
    // res.send("Hello World")
})




app.post("/producs", (req,res) => {
    const newProduc= {id:products.length + 1 ,...req.body }
    products.push(newProduc)
    res.send(newProduc)
})




app.put("/producs/:id", (req,res) => {
    const newData=req.body
    const findProducID = products.find((item)=> item.id === Number(req.params.id))
    console.log(findProducID);
    
    if(!findProducID ){
        return res.status(404).json({
            message: "Produc NO found"
        })
    }

    products = products.map((item) => item.id === Number(req.params.id) ?{...item, ...newData} : item)
    console.log(products);
    

    res.json({
        message: "Produc Update successfully"
    })
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


app.listen(4000)
console.log(`${app.get("appName")} on port ${4000}`);
