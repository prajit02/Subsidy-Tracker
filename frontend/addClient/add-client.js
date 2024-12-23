let maxClientId, maxPolicyId, oldIDs;

async function fetchBanks() {
    const response = await fetch('/api/clients/bank/all');
    const banks = await response.json();

    const bankSelect = document.querySelector('#bankName');
    document.getElementById('bankName').innerHTML = '';

    for(let bankObj of banks){
        let option = document.createElement('option');
        option.text = bankObj.bankName;
        option.value = bankObj.bankName;
        
        bankSelect.append(option);
    }
}

async function getmaxIDs() {
    const maxIDs = await fetch('/api/clients/getmax/all');
    const IDs = await maxIDs.json();
    oldIDs = IDs[0];
    maxClientId = oldIDs.maxClientID + 1;
    maxPolicyId = oldIDs.maxPolicyID + 1;

    const clientId = document.getElementById('clientId');
    clientId.value = maxClientId;  
    
    const policyId = document.getElementById('policyId');
    policyId.value = maxPolicyId;
}

document.getElementById('addClientForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const newClient = {
        clientName: document.getElementById('clientName').value,
        policyName: document.getElementById('policyName').value,
        clientId: Number(document.getElementById('clientId').value),
        policyId: Number(document.getElementById('policyId').value),
        loanPeriod: Number(document.getElementById('loanPeriod').value),
        applicationType: document.getElementById('applicationType').value,
        currentLevel: document.getElementById('currentLevel').value,
        noOfClaims: Number(document.getElementById('noOfClaims').value),
        bankName: document.getElementById('bankName').value,
        bankBranch: document.getElementById('bankBranch').value,
        status: document.getElementById('status').value,
        bankStatementDate: document.getElementById('bankStatementDate').value,
        insurancePolicyDate: document.getElementById('insurancePolicyDate').value,
    };

    // console.log("new c "+JSON.stringify(newClient))

    const response = await fetch('/api/clients/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClient)
    });

    const updateObj = {
        maxBankID: oldIDs.maxBankID,
        maxBankBranchID: oldIDs.maxBankBranchID,
        maxClientID: maxClientId,
        maxPolicyID: maxPolicyId
    }

    // console.log("new obj "+JSON.stringify(updateObj))

    const updateIDs = await fetch('/api/clients/getmax/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateObj)
    });

    if (response.ok && updateIDs.ok) {
        alert('Client added successfully!');
        document.getElementById('addClientForm').reset();  // Reset the form
        getmaxIDs();
    } else {
        alert('Error adding client!');
    }
});

fetchBanks();
getmaxIDs();