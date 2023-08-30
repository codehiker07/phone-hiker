const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText = 13}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phone);

    // 1 Select container where div created
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // Display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // Display only 12 phones if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // 2 Create a div
        const phoneCard = document.createElement('div');
        // 3 ClassList set
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl `;
        // 4 Inner HTML set
        phoneCard.innerHTML = `<figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center py-2">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>`;
        // 5 AppendChild previously created div containing variable
        phoneContainer.appendChild(phoneCard);
    });
    // Hide loading spinner
    toggleLoadingSpinner(false)
}

const handleShowDetails = async (id) => {
    // console.log('Id:', id);
    // Load single phone Data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // const phone = data.data.slug;
    const phone = data.data;
    // console.log(phone);
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('phone-detail-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');

    showDetailContainer.innerHTML = `
        <img class="container w-[40%] py-5 mx-auto" src="${phone.image}" alt="" />
        <p class="py-2"><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p class="py-2"><span class="font-bold">GPS:</span> ${phone?.others?.GPS || 'No GPS'}</p>
    `



    //show the modal
    show_details_modal.showModal(phone);
}

// Handle Search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll); // Calling loadPhone to get search item
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }
}

// Handle show all
const handleShowAll = () => {
    handleSearch(true);
}
loadPhone();













