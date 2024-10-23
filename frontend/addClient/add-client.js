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

    if (response.ok) {
        alert('Client added successfully!');
        document.getElementById('addClientForm').reset();  // Reset the form
    } else {
        alert('Error adding client!');
    }
});

fetchBanks();
