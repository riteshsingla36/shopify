const mongoose = require("mongoose")

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            trim: true
        },
        category: {
            type: String,
            trim: true
        },
        image: {
            type: String,
            trim: true,
            default: "https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        brand: {
            type: String,
            trim: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "seller",
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model("product", productSchema)