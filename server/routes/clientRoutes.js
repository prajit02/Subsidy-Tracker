const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const Bank = require('../models/Bank');
const Policy = require('../models/Policy');
const MaxID = require('../models/MaxID');

// Create a new client
router.post('/add', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add client: ' + err.message });
  }
});

// Get all clients
router.get('/all', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching clients: ' + err.message });
  }
});

// Update client
router.put('/update/:id', async (req, res) => {
  try {
    const updatedClient = await Client.findOneAndUpdate({clientId: req.params.id}, req.body, { new: true });
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: 'Error updating client: ' + err.message });
  }
});

// Get Client by ID
router.get('/:id', async(req, res) => {
  try{
    const client = await Client.findOne({clientId: req.params.id})
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching client by id: ' + err.message });
  }
});

// Get all banks
router.get('/bank/all', async(req, res) => {
  try{
    const banks = await Bank.find();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching banks: ' + err.message });
  }
});

// Add new bank
router.post('/bank/add', async(req, res) => {
  try{
    const newBank = new Bank(req.body);
    // console.log(newBank);
    await newBank.save();
    res.status(201).json(newBank);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add bank: ' + err.message });
  }
});

// Update bank
router.put('/bank/update/:name', async(req, res) => {
  try {
    const updatedBank = await Bank.findOneAndUpdate({bankName: req.params.name}, req.body, { new:true });
    if(!updatedBank){
      return res.status(404).json({ message: 'Bank not found' });
    }
    res.json(updatedBank);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bank by name: ' + err.message });
  }
});

// Get all policies
router.get('/policy/all', async (req,res) => {
  try{
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching policies: ' + err.message });
  }
});

// Add policy
router.post('/policy/add', async(req,res) => {
  try{
    const newPolicy = new Policy(req.body);

    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add policy: ' + err.message });
  }
});

// Update policy
router.put('/policy/update/:name', async(req,res) => {
  try{
    const updatedPolicy = await Policy.findOneAndUpdate({policyName: req.params.name}, req.body, { new:true });
    if(!updatedPolicy){
      return res.status(404).json({ message: 'Policy not found' });
    }
    res.json(updatedPolicy);
  } catch(err) {
    res.status(500).json({ message: 'Error fetching policy by name: ' + err.message});
  }
});

router.get('/getmax/all', async(req,res) => {
  try{
    const getMax = await MaxID.find();
    res.json(getMax);
  } catch (err) {
    res.status(500).json({message: 'Error fetching MaxIDs ' + err.message});
  }
});

router.post('/getmax/add', async(req,res) => {
  try{
    const newMaxIds = new MaxID(req.body);
    
    await newMaxIds.save();
    res.status(201).json(newMaxIds);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add MaxIDs: ' + err.message});
  }
});

router.put('/getmax/update', async(req,res) => {
  try{
    const newMaxIds = new MaxID(req.body);

    await newMaxIds.save();

    const deletedRecord = await MaxID.findOneAndDelete({}).sort({ time: 1 });
    if (!deletedRecord) {
      console.log({ message: 'No records found to delete' });
    }

    res.status(201).json(newMaxIds);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Failed to update MaxIDs: ' + err.message})
  }
});

module.exports = router;