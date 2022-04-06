const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    active: {
        type: Boolean,
        default: true
    },
    total: {
        type: Number,
        trim: true,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    razorpay: {
        orderId: String,
        paymentId: String,
        signature: String
    },
    address: {
        type: Object
    },
    products: [{
        type: Object
    }]
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model("cart", cartSchema)