const mongoose = require('mongoose');
const policyCategorySchema = new mongoose.Schema({ 
    category_name: String
 });
const PolicyCategory = mongoose.model('PolicyCategory', policyCategorySchema);
module.exports = PolicyCategory;
