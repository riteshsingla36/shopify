const mongoose = require("mongoose")


const itemSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
        min: [1, "quantity has to be greater than or equal to 1"],
        default: 1
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cart"
    }
})

module.exports = mongoose.model("item", itemSchema)