const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "Please add a name"],
            trim:true
        },
        sku:{
            type: String,
            required: true,
            default: "SKU",
            trim: true,
        },
        brand: {
            type: String,
            required: [true, "Please add a brand"],
            trim: true,
        },
        color: {
            type: String,
            required: [true, "Please add a color"],
            default: "As seen",
            required: true,
        },
        quantity:{
            type: Number,
            required: [true, "Please add a quantity"],
            trim: true
        },
        sold: {
            type: Number,
            default: 0,
            trim : true,
        },
        description :{
            type: String,
            required: [true, "Please add a description"],
            trim: true,
        },
        price:{
            type:Number,
            required: [true, "Please add a price"],
            trim:true,
        },
        regularPrice:{
            type: Number,
            // require: [true," Please add a price"],
            trim: true,
        },
        images: {
            type: [String],
        },
        ratings: [{
            star: Number,
            postedby: {type:mongoose.Schema.Types.ObjectId, ref: "User"}
        }]
    },
    {
        timestamps: true,
    }
)



module.exports = mongoose.model('Product', productSchema);