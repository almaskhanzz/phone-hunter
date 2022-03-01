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
    //clearing previous phone details
    const detailsField = document.getElementById('phone-details');
    detailsField.textContent = '';
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
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                    <div class="card-body text-success">
                        <h3 class="card-text">${phone.phone_name}</h3>
                        <h3 class="card-text">${phone.brand}</h3>
                        <button onclick="getPhoneDetails('${phone.slug}')" type="button" class="details-btn w-100 mx-auto fs-5">Details</button>
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
//load phone details
const getPhoneDetails = id => {
    //console.log(details);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

//displaying phone details
const displayPhoneDetails = details => {
    //get sensors
    const getSensors = (details) => {
        details.mainFeatures.sensors.forEach(sensor => {
            console.log(sensor);
        })
    }
    //getSensors(details);
    // console.log(details.mainFeatures.sensors[0]);
    const detailsField = document.getElementById('phone-details');
    detailsField.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    if (details.releaseDate === '') {
        div.innerHTML = `
        <img src="${details.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-text">${details.name}</h3>
            <h3 class="card-text text-danger">${'no release date found'}</h3>
            <h3 class="card-text">${details.mainFeatures.storage}</h3>
            <h3 class="card-text">${details.mainFeatures.chipSet}</h3>
            <h3 class="card-text">${details.mainFeatures.memory}</h3>
            <h3 class="card-text">${getSensors(details)}</h3>
        </div>
    `;
        detailsField.appendChild(div);
    }
    else {
        div.innerHTML = `
        <img src="${details.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-text">${details.name}</h3>
            <h3 class="card-text">${details.releaseDate}</h3>
            <h3 class="card-text">${details.mainFeatures.storage}</h3>
            <h3 class="card-text">${details.mainFeatures.chipSet}</h3>
            <h3 class="card-text">${details.mainFeatures.memory}</h3>
            <h3 class="card-text">${getSensors(details)}</h3>
        </div>
    `;
        detailsField.appendChild(div);
    }

}