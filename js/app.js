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
    // console.log(phones.length);
    if (phones.length <= 20) {
        if (phones.length !== 0) {
            phones.forEach(phone => {
                //console.log(phone);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card h-100 p-1" style="background-color:#281f2c; border-radius: 12px">
                    <img src="${phone.image}" class="card-img-top img-fluid" style="border-radius: 12px" alt="...">
                    <div class="card-body">
                        <h3 class="card-text" style="color: white">${phone.phone_name}</h3>
                        <h3 class="card-text" style="color: white">${phone.brand}</h3>
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
    else {
        //do this
        console.log('try latter');
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
    //getSensors(details);
    // console.log(details.mainFeatures.sensors[0]);
    const detailsField = document.getElementById('phone-details');
    detailsField.textContent = '';
    const div = document.createElement('div');
    div.classList.add('p-2');
    div.innerHTML = `
    <div class="card w-100 mx-auto" style="background-color: #281f2c">
        <img src="${details.image}" class="card-img-top p-1 p-lg-2 w-50 mx-auto img-fluid" style="border-radius: 28px" alt="...">
        <div class="card-body bg-style table-responsive" id="tb-responsive">
            <table class="table table-dark table-hover align-middle">
                <tbody>
                    <tr>
                        <th scope="col" class="fs-5">Name</th>
                        <td class="fs-5">${details.name}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="${details.releaseDate ? '' : 'text-danger'}">Release Date</th>
                        <td>${details.releaseDate ? details.releaseDate : 'no release date found'}</td>
                    </tr>
                    <tr>
                        <th scope="row">Storage</th>
                        <td>${details.mainFeatures.storage}</td>
                    </tr>
                    <tr>
                        <th scope="row">Chipset</th>
                        <td colspan="2">${details.mainFeatures.chipSet}</td>
                    </tr>
                    <tr>
                        <th scope="row">Memory</th>
                        <td colspan="2">${details.mainFeatures.memory}</td>
                    </tr>
                    <tr>
                        <th scope="row">Display Size</th>
                        <td colspan="2">${details.mainFeatures.displaySize}</td>
                    </tr>
                    <tr>
                        <th scope="row">Sensors</th>
                        <td colspan="2">${details.mainFeatures.sensors}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="${details.others ? '' : 'text-danger'}">WLAN</th>
                        <td colspan="2">${details.others ? details.others.WLAN : 'no data found'}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="${details.others ? '' : 'text-danger'}">Bluetooth</th>
                        <td colspan="2">${details.others ? details.others.Bluetooth : 'no data found'}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="${details.others ? '' : 'text-danger'}">GPS</th>
                        <td colspan="2">${details.others ? details.others.GPS : 'no data found'}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="${details.others ? '' : 'text-danger'}">NFC</th>
                        <td colspan="2">${details.others ? details.others.NFC : 'no data found'}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="${details.others ? '' : 'text-danger'}">Radio</th>
                        <td colspan="2">${details.others ? details.others.Radio : 'no data found'}</td>
                    </tr>
                    <tr>
                        <th scope="row" class="${details.others ? '' : 'text-danger'}">USB</th>
                        <td colspan="2">${details.others ? details.others.USB : 'no data found'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>    
    `;
    detailsField.appendChild(div);
}