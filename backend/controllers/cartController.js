const router = require("express").Router()
const authenticator = require("../middleware/authmiddleware")
const Cart = require("../models/cartModel")


router.get("/", authenticator, async (req, res) => {
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

router.get("/:id", authenticator, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        res.status(200).json(cart)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.post("/", authenticator, async (req, res) => {
    try {
        const cart = await Cart.create(req.body)
        res.status(201).json(cart)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

router.patch("/:id/pay-order", authenticator, async (req, res) => {
    try {
        const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature, address, products } = req.body;

        await Cart.findByIdAndUpdate(req.params.id, {
            isPaid: true,
            active: false,
            total: amount,
            razorpay: {
                orderId: razorpayOrderId,
                paymentId: razorpayPaymentId,
                signature: razorpaySignature
            },
            address: address,
            products: products
        })

        res.send({ msg: "Payment is successful" })
    }
    catch (err) {
        res.status(500).send(err)
    }
})
module.exports = router