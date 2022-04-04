const express = require("express")
const Product = require("../models/productModel")
const Jwt = require("jsonwebtoken")
const authenticator = require("../middleware/authmiddleware")
const Jwtkey = "ritesh"

const router = express.Router()


router.get("/all", async (req, res) => {
    try {
        const products = await Product.find().populate("seller")
        res.status(200).json(products)
    }
    catch (err) {
        res.status(401).json({ error: err.message })
    }
})
router.get("/single-product/:id", authenticator, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }
    catch (err) {
        res.status(400).json({ error: "something happened" })
    }
})

module.exports = router