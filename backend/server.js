const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const Razorpay = require("Razorpay")
const dotenv = require('dotenv')
const Cart = require("./models/cartModel")

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

app.get("/get-razorpay-key", async (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY });
})


app.post("/create-order", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET
        });
        const options = {
            amount: req.body.amount,
            currency: "INR"
        }
        const order = await instance.orders.create(options)
        if (!order) {
            return res.status(500).send("Some Error Occured");
        }
        res.send(order)
    }
    catch (err) {
        res.status(500).send(err)
    }
})




app.listen(8000, console.log("listening to port 8000......"))