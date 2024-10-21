// Fetch clients and display
async function fetchClients() {
    const response = await fetch('/api/clients/all');
    const clients = await response.json();
    const tableBody = document.getElementById('clientTableBody');
    tableBody.innerHTML = '';  // Clear previous rows

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.clientName}</td>
            <td>${client.clientId}</td>
            <td>${client.policyName}</td>
            <td>${client.policyId}</td>
            <td>${client.loanPeriod}</td>
            <td>${client.applicationType}</td>
            <td>${client.currentLevel}</td>
            <td>${client.noOfClaims}</td>
            <td>${client.bankName}</td>
            <td>${client.bankBranch}</td>
            <td>${client.status}</td>
            <td>${client.bankStatementDate ? new Date(client.bankStatementDate).toLocaleDateString() : ''}</td>
            <td>${client.insurancePolicyDate ? new Date(client.insurancePolicyDate).toLocaleDateString() : ''}</td>
            <td>
                <button onclick="editClient(${client.clientId})">Update</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to handle editing a client
function editClient(clientId) {
    // Redirect to the update-client.html page with the client ID as a query parameter
    window.location.href = `updateClient/update-client.html?clientId=${clientId}`;
}

// Fetch clients on page load
fetchClients();