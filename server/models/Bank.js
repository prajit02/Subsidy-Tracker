const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    bankName: { type: String, required: true }
});

module.exports = mongoose.model('Bank', bankSchema);