const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}


const displayPhones = phones => {
    // console.log(phone);

    // 1 Select container where div created
    const phoneContainer = document.getElementById('phone-container');
    // Clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // Display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // Display only 12 phones
    phones = phones.slice(0, 12);

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
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>`;
        // 5 AppendChild previously created div containing variable
        phoneContainer.appendChild(phoneCard);
    });
    // Hide loading spinner
    toggleLoadingSpinner(false)
}

// Handle Search button
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText); // Calling loadPhone to get search item
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
// loadPhone();













