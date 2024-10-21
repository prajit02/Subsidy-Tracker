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

/**
 * db.clients.insertMany([
  {
    clientName: "John Doe",
    clientId: 101,
    policyName: "Life Insurance",
    policyId: 20201,
    loanPeriod: 5,
    applicationType: "File",
    currentLevel: "Officer",
    noOfClaims: 1,
    bankName: "ABC Bank",
    bankBranch: "Main Branch",
    status: "Pending",
    bankStatementDate: new Date("2024-01-15"),
    insurancePolicyDate: new Date("2022-05-20")
  },
  {
    clientName: "Jane Smith",
    clientId: 102,
    policyName: "Car Insurance",
    policyId: 20202,
    loanPeriod: 3,
    applicationType: "Claim",
    currentLevel: "Regional Manager (RM)",
    noOfClaims: 2,
    bankName: "XYZ Bank",
    bankBranch: "East Branch",
    status: "Approved",
    bankStatementDate: new Date("2024-02-10"),
    insurancePolicyDate: new Date("2021-08-12")
  },
  {
    clientName: "Alice Johnson",
    clientId: 103,
    policyName: "Home Insurance",
    policyId: 20203,
    loanPeriod: 7,
    applicationType: "File",
    currentLevel: "Clerk",
    noOfClaims: 0,
    bankName: "PQR Bank",
    bankBranch: "West Branch",
    status: "Rejected",
    bankStatementDate: new Date("2024-03-20"),
    insurancePolicyDate: new Date("2020-11-25")
  },
  {
    clientName: "Bob Brown",
    clientId: 104,
    policyName: "Health Insurance",
    policyId: 20204,
    loanPeriod: 2,
    applicationType: "Claim",
    currentLevel: "General Manager (GM)",
    noOfClaims: 3,
    bankName: "LMN Bank",
    bankBranch: "North Branch",
    status: "Approved",
    bankStatementDate: new Date("2024-04-15"),
    insurancePolicyDate: new Date("2019-01-10")
  },
  {
    clientName: "Charlie Davis",
    clientId: 105,
    policyName: "Travel Insurance",
    policyId: 20205,
    loanPeriod: 1,
    applicationType: "NA",
    currentLevel: "Officer",
    noOfClaims: 0,
    bankName: "DEF Bank",
    bankBranch: "South Branch",
    status: "Pending",
    bankStatementDate: new Date("2024-05-01"),
    insurancePolicyDate: new Date("2023-12-05")
  }
]);

 */