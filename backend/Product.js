const mongoose = require('./db') // conecta a tu db.js

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  product_type: String,
  price: String,
  image_link: String
})

module.exports = mongoose.model('Product', productSchema)
