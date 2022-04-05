const mongoose = require("mongoose")

const addressSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    flat_no: {
        type: String,
        trim: true
    },
    area: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    pincode: {
        type: Number,
        trim: true,
        max: 999999
    },
    mobile: {
        type: Number,
        trim: true,
        max: 9999999999
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

module.exports = mongoose.model("address", addressSchema)

