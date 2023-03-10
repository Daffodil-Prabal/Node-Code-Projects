const product = require("../models/product")

const getAllProductsStatic = async (req, res) => {

    const products = await product.find({ featured: true })
    res.status(200).json({ nbHits: products.length, products })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query;
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }
    const products = await product.find(queryObject)
    res.status(200).json({ nbHits: products.length, products })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}