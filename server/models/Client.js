const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientId: { type: Number, required: true, unique: true },
  policyName: { type: String, required: true },
  policyId: { type: Number, required: true, unique: true },
  loanPeriod: { type: Number, required: true },
  applicationType: { type: String, enum: ['NA', 'File', 'Claim'], required: true },
  currentLevel: { type: String, enum: ['NA', 'Clerk', 'Officer', 'Regional Manager (RM)', 'General Manager (GM)'], required: true },
  noOfClaims: { type: Number, required: true },
  bankName: { type: String, required: true },
  bankBranch: { type: String, required: true },
  status: { type: String, enum: ['NA', 'Pending', 'Approved', 'Rejected'], required: true },
  bankStatementDate: { type: Date },
  insurancePolicyDate: { type: Date },
});

module.exports = mongoose.model('Client', clientSchema);