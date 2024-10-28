async function fetchPolicies(){
    const response = await fetch('/api/clients/policy/all');
    const policies = await response.json();
    
    const policySelect = document.querySelector('#policies');
    document.getElementById('policies').innerHTML = '';

    let defaultOption = document.createElement('option');
    defaultOption.text = 'New Policy';
    defaultOption.value = 'New Policy';

    policySelect.append(defaultOption);

    for(let policyObj of policies){
        let option = document.createElement('option');
        option.text = policyObj.policyName;
        option.value = policyObj.policyName;
        
        policySelect.append(option);
    }

}

document.getElementById('addPolicyForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const selectedOption = document.getElementById('policies').value;

    const newPolicy = {
        policyName: document.getElementById('policyName').value.toUpperCase()
    };

    if(selectedOption === 'New Policy'){
        const response = await fetch('/api/clients/policy/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPolicy)
        });
    
        if(response.ok) {
            alert('Policy added successfully!');
            document.getElementById('addPolicyForm').reset();
            fetchPolicies();
        } else {
            alert('Error adding policy!');
        }
    } else {
        const response = confirm(`Are you sure you want to update ${selectedOption} to ${newPolicy.policyName} ?`)
        if(response){
            const confirmation = fetch(`/api/clients/policy/update/${selectedOption}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPolicy)
            }).then(res => {
                alert('Policy Updated Successfully!');
                window.location.href = '/index.html';
            }, err => {
                alert(`Error while updating Policy ${err}`);
            });
        } else {

        }
    }
});

fetchPolicies();