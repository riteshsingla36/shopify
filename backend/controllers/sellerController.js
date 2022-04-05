const express = require("express")
const Seller = require("../models/sellerModel")
const Jwt = require("jsonwebtoken")
const authenticator = require("../middleware/authmiddleware")


const router = express.Router()

router.get("/:id", authenticator, async (req, res) => {
    try {
        const sellers = await Seller.findById(req.params.id)
        res.status(200).json(sellers)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
})

router.patch("/edit-profile/:id", authenticator, async (req, res) => {
    try {
        const seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(seller)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
})

router.post("/signup", async (req, res) => {
    if (req.body.name && req.body.email && req.body.password) {
        try {
            const seller = await Seller.create(req.body)
            Jwt.sign({ seller }, process.env.JWT_KEY, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.json({ error: "please check details again" })
                }
                res.status(201).json({ seller, auth: token })
            })
        }
        catch (err) {
            res.status(401).json({ error: err.message + "ds" })
        }
    }
    else {
        res.status(400).json({ error: "please provide all details" })
    }
})

router.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        try {
            const seller = await Seller.findOne(req.body).select("-password")
            Jwt.sign({ seller }, process.env.JWT_KEY, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.status(400).json({ error: err.message })
                }
                res.status(200).json({ seller, auth: token })
            })


        }
        catch (err) {
            res.status(400).json({ error: "no seller found" })
        }
    }
    else {
        res.status(400).json({ error: "please provide all details" })
    }
})

module.exports = router