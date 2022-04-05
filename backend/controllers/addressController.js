const router = require("express").Router()
const Address = require("../models/addressModel")
const authenticator = require("../middleware/authmiddleware")

router.get("/", authenticator, async (req, res) => {
    var q = {}
    if (req.query.user) {
        q["user"] = req.query.user
    }
    try {
        const addresses = await Address.find(q).populate('user')
        res.json(addresses)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.get("/:id", authenticator, async (req, res) => {
    try {
        const address = await Address.findById(req.params.id).populate('user')
        res.json(address)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.post("/", authenticator, async (req, res) => {
    try {
        const address = await Address.create(req.body)
        res.json(address)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.patch("/:id", authenticator, async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(address)
    }
    catch (err) {
        res.send(err.message)
    }
})
router.delete("/:id", authenticator, async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id)
        res.json(address)
    }
    catch (err) {
        res.send(err.message)
    }
})

module.exports = router