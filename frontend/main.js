var clients;

// Fetch clients and display
async function fetchClients() {
    const response = await fetch('/api/clients/all');
    clients = await response.json();
    const tableBody = document.getElementById('clientTableBody');
    tableBody.innerHTML = '';  // Clear previous rows

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.clientName}</td>
            
            <td>${client.policyName}</td>
            
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

    const sliceClients = document.querySelector('#ClientNames');
    const sliceApplications = document.querySelector('#ApplicationTypes');
    const sliceLevels = document.querySelector('#CurrentLevels');
    const sliceBanks = document.querySelector('#BankNames');
    const sliceStatus = document.querySelector('#AllStatus');

    let ClientsSet = new Set();
    let ApplationsSet = new Set();
    let LevelsSet = new Set();
    let BanksSet = new Set();
    let StatusSet = new Set();

    clients.forEach(client => {
        ClientsSet.add(client.clientName);
        ApplationsSet.add(client.applicationType);
        LevelsSet.add(client.currentLevel);
        BanksSet.add(client.bankName);
        StatusSet.add(client.status);
    });

    ClientsSet = Array.from(ClientsSet).sort();
    ApplationsSet = Array.from(ApplationsSet).sort();
    LevelsSet = Array.from(LevelsSet).sort();
    BanksSet = Array.from(BanksSet).sort();
    StatusSet = Array.from(StatusSet).sort();

    ClientsSet.forEach(uClient => {
        let HTMLOption = document.createElement('option');
        HTMLOption.text = uClient;
        HTMLOption.value = uClient;
        sliceClients.append(HTMLOption);
    });

    ApplationsSet.forEach(uApplication => {
        let HTMLOption = document.createElement('option');
        HTMLOption.text = uApplication;
        HTMLOption.value = uApplication;
        sliceApplications.append(HTMLOption);
    });

    LevelsSet.forEach(uLevel => {
        let HTMLOption = document.createElement('option');
        HTMLOption.text = uLevel;
        HTMLOption.value = uLevel;
        sliceLevels.append(HTMLOption);
    });

    BanksSet.forEach(uBank => {
        let HTMLOption = document.createElement('option');
        HTMLOption.text = uBank;
        HTMLOption.value = uBank;
        sliceBanks.append(HTMLOption);
    });

    StatusSet.forEach(uStatus => {
        let HTMLOption = document.createElement('option');
        HTMLOption.text = uStatus;
        HTMLOption.value = uStatus;
        sliceStatus.append(HTMLOption);
    });
}

// Function to handle editing a client
function editClient(clientId) {
    // Redirect to the update-client.html page with the client ID as a query parameter
    window.location.href = `updateClient/update-client.html?clientId=${clientId}`;
}

// Fetch clients on page load
fetchClients();