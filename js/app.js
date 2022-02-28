document.getElementById('btn-phones').addEventListener('click', () => {
    //getting search value...
    const searchInput = document.getElementById('phone-input');
    const searchText = searchInput.value;
    //fetching url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
});
//displaying phone
const displayPhones = phones => {
    const searchResult = document.getElementById('display-phones');
    //clearing previous display result
    //searchResult.textContent = '';
    if (phones.length !== 0) {
        phones.forEach(phone => {
            //console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body">
                        <h3 class="card-text">${phone.phone_name}</h3>
                        <h3 class="card-text">${phone.brand}</h3>
                        <button onclick="details('${phone.slug}')" type="button" class="details-btn w-100 mx-auto fs-5">Details</button>
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
//error handling...
const errorMessage = (errId, showMessage) => {
    const errorField = document.getElementById(errId);
    errorField.innerText = '';
    const p = document.createElement('p');
    p.classList.add('error-msg');
    p.innerText = 'No phone found';
    errorField.appendChild(p);
    document.body.style.display = showMessage;
}
