const loadPhone = async (searchText = 'a', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    // console.log(phones);
    displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones)
    // step:1
    const phoneContainer = document.getElementById('phone-container');
    // Clear remaining search result after new search result
    phoneContainer.textContent = '';

    // display show all button if there are more than 9 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 9 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden')
    }
    // console.log(phones.length)
    // Display Only first 9 Phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,9);
    }

    phones.forEach(phone =>{
        // console.log(phone)
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
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-outline btn-success">
                Show Details
              </button>
            </div>
        </div>
        `
        // step:4 append Child
        phoneContainer.appendChild(phoneCard)
    })

    // Hide Loading Spinner
    toggleLoadingSpinner(false);
}
// Show Details Button functionality
const handleShowDetails = async (id) => {
    // console.log('Show detail clicked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    // console.log(data.data)
    const phone = data.data;
    // load Single Phone data
    showPhoneDetail(phone)
}
// Display Modal with details
const showPhoneDetail = (phone) =>{
    console.log(phone)
    const showDetailsContainer = document.getElementById('show_detail_container');
    showDetailsContainer.innerHTML = `
        <img class="ml-32" src="${phone.image}" alt="" />
        <h3  class="font-bold text-2xl">${phone.name}</h3>
        <p class="font-bold">Storage:<span>${phone?.mainFeatures?.storage}</span></p>
        <p class="font-bold ">Display Size: <span>${phone?.mainFeatures?.displaySize
        }</span></p>
        <p class="font-bold ">Memory: <span>${phone?.mainFeatures?.memory}</span></p>
        <p class="font-bold ">GPS: <span>${phone?.others?.GPS}</span></p>
        <p class="font-bold ">Brand: <span>${phone?.brand}</span></p>
    `
    // show the modal
    show_details_modal.showModal()
}
// Handle Search Button
const handleSearch = (isShowAll) =>{
    // call the loading spinner function
    toggleLoadingSpinner(true);
    // console.log('Search Handle')
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhone(searchText, isShowAll);
}
// Loading function
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loader-container');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// Handle Show all
const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();