const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const dotenv = require('dotenv')

const sellerController = require("./controllers/sellerController")
const productController = require("./controllers/sellerProductController")
const clientProductController = require("./controllers/clientProductController")
const userController = require("./controllers/userController")
const cartController = require("./controllers/cartController")
const itemController = require("./controllers/itemController")
const addressController = require("./controllers/addressController")

dotenv.config({ path: "./.env" })
mongoose.connect(process.env.DB_URI).then(() => console.log("mongodb connected successfully...")).catch(err => console.log(err.message))

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
app.use("/address", addressController)

app.listen(8000, console.log("listening to port 8000......"))