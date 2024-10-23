async function fetchBanks(){
    const response = await fetch('/api/clients/bank/all');
    const banks = await response.json();
    
    const bankSelect = document.querySelector('#banks');
    document.getElementById('banks').innerHTML = '';

    let defaultOption = document.createElement('option');
    defaultOption.text = 'New Bank';
    defaultOption.value = 'New Bank';

    bankSelect.append(defaultOption);

    for(let bankObj of banks){
        let option = document.createElement('option');
        option.text = bankObj.bankName;
        option.value = bankObj.bankName;
        
        bankSelect.append(option);
    }

}

document.getElementById('addBankForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const selectedOption = document.getElementById('banks').value;

    const newBank = {
        bankName: document.getElementById('bankName').value
    };

    if(selectedOption === 'New Bank'){
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
            fetchBanks();
        } else {
            alert('Error adding bank!');
        }
    } else {
        const response = confirm(`Are you sure you want to update ${selectedOption} to ${newBank.bankName} ?`)
        if(response){
            const confirmation = fetch(`/api/clients/bank/update/${selectedOption}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBank)
            }).then(res => {
                alert('Bank Updated Successfully!');
                window.location.href = '/index.html';
            }, err => {
                alert(`Error while updating Bank ${err}`);
            });
        } else {

        }
    }
});

fetchBanks();