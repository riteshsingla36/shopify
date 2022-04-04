const express = require("express")
const Product = require("../models/productModel")
const Jwt = require("jsonwebtoken")
const authenticator = require("../middleware/authmiddleware")
const Jwtkey = "ritesh"

const router = express.Router()

router.post("/add", authenticator, async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    }
    catch (err) {
        res.status(400).json({ error: "something happened" })
    }
})

router.get("/all-products", authenticator, async (req, res) => {
    try {
        const products = await Product.find({ "seller": req.query.seller }).populate("seller")
        res.status(200).json(products)
    }
    catch (err) {
        res.status(400).json({ error: "something happened" })
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

router.delete("/delete-product/:id", authenticator, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(product)
    }
    catch (err) {
        res.status(400).json({ error: "something happened" })
    }
})

router.patch("/edit-product/:id", authenticator, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(product)
    }
    catch (err) {
        res.status(400).json({ error: "something happened" })
    }
})

module.exports = router