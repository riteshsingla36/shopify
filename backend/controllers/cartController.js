const router = require("express").Router()
const Cart = require("../models/cartModel")


router.get("/", async (req, res) => {
    var q = {}
    if (req.query.user) {
        q["user"] = req.query.user
    }

    if (req.query.active) {
        q["active"] = req.query.active
    }

    try {
        const cart = await Cart.find(q)
        res.status(200).json(cart)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        res.status(200).json(cart)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const cart = await Cart.create(req.body)
        res.status(201).json(cart)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

module.exports = router