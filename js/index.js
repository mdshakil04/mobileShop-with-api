const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones)
}

const displayPhones = phones =>{
    // console.log(phones)
    // step:1
    const phoneContainer = document.getElementById('phone-container');
    // Clear remaining search result after new search result
    phoneContainer.textContent = '';

    phones.forEach(phone =>{
        console.log(phone)
        // step:2 Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl py-4`
        // step:3 set innerHTML
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center py-4">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions">
                <button class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        // step:4 append Child
        phoneContainer.appendChild(phoneCard)

    })
}

// Handle Search Button
const handleSearch = () =>{
    // console.log('Search Handle')
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText)

}

// loadPhone();