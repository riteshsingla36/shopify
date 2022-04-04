const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()

const sellerController = require("./controllers/sellerController")
const productController = require("./controllers/sellerProductController")
const clientProductController = require("./controllers/clientProductController")
const userController = require("./controllers/userController")
const cartController = require("./controllers/cartController")
const itemController = require("./controllers/itemController")

mongoose.connect("mongodb+srv://ritesh:ritesh_123@cluster0.xrcit.mongodb.net/ecomm-dashboard?retryWrites=true&w=majority").then(() => console.log("mongodb connected successfully...")).catch(err => console.log(err.message))

app.use(express.json())
app.use(cors())


// seller controllers

app.use("/seller/user", sellerController)
app.use("/seller/product", productController)

// user controllers

app.use("/user/product", clientProductController)
app.use("/user", userController)
app.use("/cart", cartController)
app.use('/item', itemController)

app.listen(8000, console.log("listening to port 8000......"))