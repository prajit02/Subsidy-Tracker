const mongoose = require('mongoose');
    
const MaxSchema = new mongoose.Schema({
    maxBankID: { type: Number, required: true},
    maxBankBranchID: { type: Number, required: true },
    maxClientID: { type: Number, required: true },
    maxPolicyID: { type: Number, required: true},
    time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MaxID', MaxSchema);