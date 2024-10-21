// const query  = require('express');

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('clientId');

    if (clientId) {
        // Fetch client data based on clientId
        const response = await fetch(`http://localhost:5000/api/clients/${clientId}`);
        if (response.ok) {
            const client = await response.json();
            // Populate the form with client data
            document.getElementById('updateClientId').value = client.clientId; // You may want to hide this
            document.getElementById('updateClientName').value = client.clientName || '';
            document.getElementById('updatePolicyName').value = client.policyName || '';
            document.getElementById('updatePolicyId').value = client.policyId || '';
            document.getElementById('updateLoanPeriod').value = client.loanPeriod || '';
            document.getElementById('updateApplicationType').value = client.applicationType || '';
            document.getElementById('updateCurrentLevel').value = client.currentLevel || '';
            document.getElementById('updateNoOfClaims').value = client.noOfClaims || '';
            document.getElementById('updateBankName').value = client.bankName || '';
            document.getElementById('updateBankBranch').value = client.bankBranch || '';
            document.getElementById('updateStatus').value = client.status || '';
            document.getElementById('updateBankStatementDate').value = client.bankStatementDate ? new Date(client.bankStatementDate).toISOString().split('T')[0] : '';
            document.getElementById('updateInsurancePolicyDate').value = client.insurancePolicyDate ? new Date(client.insurancePolicyDate).toISOString().split('T')[0] : '';
        } else {
            alert('Error fetching client data!');
        }
    }
});

// Update client on form submission
document.getElementById('updateClientForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const clientId = params.get('clientId');

    const updatedData = {
        clientName: document.getElementById('updateClientName').value,
        policyName: document.getElementById('updatePolicyName').value,
        policyId: document.getElementById('updatePolicyId').value,
        loanPeriod: document.getElementById('updateLoanPeriod').value,
        applicationType: document.getElementById('updateApplicationType').value,
        currentLevel: document.getElementById('updateCurrentLevel').value,
        noOfClaims: document.getElementById('updateNoOfClaims').value,
        bankName: document.getElementById('updateBankName').value,
        bankBranch: document.getElementById('updateBankBranch').value,
        status: document.getElementById('updateStatus').value,
        bankStatementDate: document.getElementById('updateBankStatementDate').value,
        insurancePolicyDate: document.getElementById('updateInsurancePolicyDate').value,
    };

    console.log("cid: "+clientId)

    const response = await fetch(`/api/clients/update/${clientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });

    if (response.ok) {
        alert('Client updated successfully!');
        window.location.href = '/index.html';  // Redirect back to main page
    } else {
        const errorData = await response.json(); // Assuming the server returns a JSON error response
        console.error('Error updating client:', errorData.message || 'Unknown error');
        alert(`Error updating client: ${errorData.message || 'Unknown error'}`);
    }
});