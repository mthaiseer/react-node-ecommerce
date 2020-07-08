const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
        maxlength: 35
    },
    price :{
        type: Number,
        required: true,
        maxlength: 35
    },
    description :{
        type: String,
        required: true,
        trim: true,
        minlenght: 4,
        maxlength: 2000
    },
    category :{
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        required: true,
        default: 0
    },
    photo : {
        data: Buffer,
        contentType: String
    },
    shipping : {
        type: Boolean,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
