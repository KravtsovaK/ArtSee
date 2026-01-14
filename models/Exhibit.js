const mongoose = require('mongoose');

const ExhibitSchema = new mongoose.Schema({
    title: { type: String, required: true },
    museum: { type: String, required: true },
    year: String,
    type: String,
    inventoryNumber: String,
    description: String,
    material: String,
    dimensions: String,
    author: String,
    images: [String]
});

module.exports = mongoose.model('Exhibit', ExhibitSchema);