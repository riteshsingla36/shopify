const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("cart", cartSchema)