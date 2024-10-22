document.getElementById('addBankForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const newBank = {
        bankName: document.getElementById('bankName').value
    };

    const response = await fetch('/api/clients/bank/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBank)
    });

    if(response.ok) {
        alert('Bank added successfully!');
        document.getElementById('addBankForm').reset();
    } else {
        alert('Error adding bank!');
    }
});