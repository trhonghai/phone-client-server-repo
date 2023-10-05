const asyncHandler = require("express-async-handler");
const Product = require("../models/product.Model");


const createProduct = asyncHandler (async (req, res) => {
    const {
        name,
        sku,
        brand,
        quantity,
        price,
        description,
        image,
        regularPrice,
        color,
     } = req.body

    if(!name || !brand || !quantity || !price || !description  ) {
        res.status(400);
        throw new Error("Please fill in all fields");
    }

    // Create  Product
    const product = await Product.create({
        name,
        sku,
        brand,
        quantity,
        price,
        description,
        image,
        regularPrice,
        color
    })
    res.status(201).json(product);   
})

// get Products
const getProducts = asyncHandler( async (req, res)=>{
    const products= await Product.find().sort("-createdAt");
    res.status(201).json(products);

})

// get single Product

const getProduct = asyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found.");
    }
    res.status(201).json(product );

})

// Delete Product

const deleteProduct = asyncHandler(async(req, res) =>{
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found.");
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({message: "Product Deleted."});

})

// update Product

const updateProduct = asyncHandler(async (req, res) =>{
    const {
        name,
        brand,
        quantity,
        price,
        description,
        image,
        regularPrice,
        color,
     } = req.body;
    const product = await Product.findById(req.params.id);
    if(!product){
        res.status(404);
        throw new Error("Product not found.");
    }

    // update product
    const updateProduct = await Product.findByIdAndUpdate(
        {_id:req.params.id},
        {
            name,
            brand,
            quantity,
            price,
            description,
            image,
            regularPrice,
            color,
        },{
            new: true,
            runValidators: true,
        }
    );
    
    res.status(201).json(updateProduct);


})

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}