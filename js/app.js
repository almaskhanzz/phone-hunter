//error handling...
const errorMessage = (errId, showMessage) => {
    const errorField = document.getElementById(errId);
    errorField.innerText = '';
    const p = document.createElement('p');
    p.classList.add('error-msg');
    p.innerText = 'No phone found!!! Please try again...';
    errorField.appendChild(p);
    document.body.style.display = showMessage;
}
//button click...
document.getElementById('btn-phones').addEventListener('click', () => {
    //getting search value...
    const searchInput = document.getElementById('phone-input');
    const searchText = searchInput.value;
    if (searchText !== '') {
        searchInput.value = '';
        //fetching url
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhones(data.data))
    }
    else {
        errorMessage('error-msg', 'block');
        //clearing previous display result
        const searchResult = document.getElementById('display-phones');
        searchResult.textContent = '';
    }
});
//displaying phone
const displayPhones = phones => {
    const searchResult = document.getElementById('display-phones');
    //clearing previous display result
    searchResult.textContent = '';
    if (phones.length !== 0) {
        phones.forEach(phone => {
            //console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100 border-dark">
                    <img src="${phone.image}" class="card-img-top w-100 img-fluid" alt="...">
                    <div class="card-body text-success">
                        <h3 class="card-text">${phone.phone_name}</h3>
                        <h3 class="card-text">${phone.brand}</h3>
                        <button onclick="getDetails('${phone.slug}')" type="button" class="details-btn w-100 mx-auto fs-5">Details</button>
                    </div>
                </div>
            `;
            searchResult.appendChild(div);
        })
        //clearing error msg
        const clearMsg = document.getElementById('error-msg');
        clearMsg.innerText = '';
    }
    else {
        errorMessage('error-msg', 'block');
    }
}
// displaying phone details
const getDetails = details => {
    console.log(details);
}
