const router = require("express").Router()
const authenticator = require("../middleware/authmiddleware")
const Item = require("../models/itemModel")

router.get("/", authenticator, async (req, res) => {
    let q = {}
    if (req.query.cart) {
        q["cart"] = req.query.cart
    }
    try {
        const items = await Item.find(q).populate("product")
        res.json(items)
    }
    catch (err) {
        res.json({ error: err.message })
    }
})

router.post("/", authenticator, async (req, res) => {
    try {
        const item = await Item.create(req.body)
        res.json(item)
    }
    catch (err) {
        res.json({ error: err.message })
    }
})

router.patch("/:id", authenticator, async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(item)
    }
    catch (err) {
        res.json({ error: err.message })
    }
})
router.delete("/:id", authenticator, async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id)
        res.json(item)
    }
    catch (err) {
        res.json({ error: err.message })
    }
})


module.exports = router