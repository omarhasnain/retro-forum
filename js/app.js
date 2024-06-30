const loadPosts = async (searchText) => {

    const response = await fetch(` https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await response.json();
    const allPost = data.posts;

    console.log(allPost);
    
    const cardContainer = document.getElementById("card-container");
    cardContainer.textContent = '';
    if (allPost && allPost.length > 0){
        allPost.forEach(post=>{
            const postCard = document.createElement("div");
            postCard.classList = `card card-side flex bg-[#7D7DFC1A] my-6 shadow-xl`;
            postCard.innerHTML = `
            <div class="flex pl-5 lg:p-4">
                <figure><img class="w-28 h-16 lg:w-16 items-center lg:h-16 rounded-xl mb-4" src="${post.image}" alt=""></figure>
                <div class="card-body py-8">
                    <div class="flex gap-6">
                        <h2 class="text-sm font-medium text-[#12132DCC]"># <span>${post.category}</span></h2>
                        <p class="text-sm font-medium text-[#12132DCC]">Author: <span>${post.author.name}</span></p>
                    </div>
                    <h1 class="card-title mulish text-xl font-bold">${post.title}</h1>
                    <p class="inter text-lg text-[#12132D99]">${post.description}</p>
                    <hr>
                    <div class="card-actions flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-comment text-[#12132D99]"></i>
                            <p class="text-base text-[#12132D99]">${post.comment_count}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-eye text-[#12132D99]"></i>
                            <p class="text-base text-[#12132D99]">${post.view_count}</p>
                        </div>
                        <div class="flex items-center gap-2">
                            <i class="fa-regular fa-clock text-[#12132D99]"></i>
                            <p class="text-base text-[#12132D99]">${post.posted_time}</p>
                        </div>
                        <button onclick="updateCardCount('${post.title}','${post.view_count}')" class="btn rounded-full bg-[#10B981]"><i class="fa-solid text-base fa-envelope-open text-white"></i></button>
                    </div>
            </div>
            `
            cardContainer.appendChild(postCard);
    
        });

    } else{
        const noResult = document.createElement("p");
        noResult.classList = `text-center mulish`;
        noResult.textContent = 'No results found.';
        cardContainer.appendChild(noResult);
    }
    
    toggleLoadingSpinner(false);
    displayDiscussArea(true);
    

};


const handleSearch = () => {
    toggleLoadingSpinner(true);

    const searchText = document.getElementById('search-box').value;
    console.log(searchText);
    // loadPosts(`?category=${searchText}`);
    loadPosts(searchText);
    displayDiscussArea(false);
    
}


let selectedProductsCount = 0;
const updateCardCount = (name,view) => {
   
    selectedProductsCount++;
    document.getElementById('card-count').innerText = `${selectedProductsCount}`;
    
    const clickedCards = document.getElementById("clicked-cards");
    console.log('clicked',clickedCards);
    
  

       
    const addClickedCard = document.createElement("div");
    addClickedCard.classList = `my-6`;
    addClickedCard.innerHTML = `
    <div class="flex items-center justify-between p-4 bg-white rounded-2xl mt-6">
                        <h2 class="mulish font-semibold text-base text-[#12132D">${name}</h2>
                        <div><i class="fa-regular fa-eye text-[#12132D99]"></i>
                        <p class="inter text-[#12132D99]">${view}</p></div>
    </div> `
    clickedCards.appendChild(addClickedCard);
  



}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById("loading-spinner");
    if(isLoading){
        loadingSpinner.classList.remove('hidden');

        setTimeout(() => {
            loadingSpinner.classList.add('hidden');
        }, 2000);
    } 
    
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const displayDiscussArea = (isDisplay) => {
    const displayDiscuss = document.getElementById("display-discuss");
    if(isDisplay){
        displayDiscuss.classList.remove('hidden');
    } else {
        displayDiscuss.classList.add('hidden');
    }
}

const loadLatestCards = async () => {

    const response = await fetch(` https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const latestPosts = await response.json();
   

    console.log(latestPosts);
    
    const latestPostCardContainer = document.getElementById("latest-post-card-container");
    latestPosts.forEach(newPost=>{
        
        const latestPostCard = document.createElement("div");
        const designation = newPost?.author?.designation ?? "Unknown";
        const posted_date = newPost?.author?.posted_date ?? "No Publish Date"; 

        latestPostCard.classList = `card w-96 bg-base-100 my-10 col-span-1 text-center items-center`;
        latestPostCard.innerHTML = `
        <div id="latest-post-card" class="card w-80 lg:w-96 bg-base-100 shadow-xl col-span-1 text-center items-center">
        <figure class="px-5 py-5 lg:px-10 lg:py-10"><img src="${newPost.cover_image}" alt="Shoes" class="rounded-xl" /></figure>
                    <div class="card-body text-start">
                        <div class="flex gap-2 items-center">
                            <i class="fa-regular fa-calendar"></i>
                            <p class="mulish text-base">${posted_date}</p>
                        </div>
                        <div class="my-3">
                            <h2 class="card-title text-lg font-extrabold mulish">${newPost.title}</h2>
                            <p class="text-base mulish">${newPost.description}</p>
                        </div>
                        <div class="flex items-center gap-4">
                            <figure><img src="${newPost.profile_image}" alt="Shoes" class="w-12 h-12 rounded-xl" /></figure>
                            <div>
                                <h4 class="font-semibold mulish text-base">${newPost?.author?.name}</h4>
                                <p class="text-sm mulish">${designation}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
        latestPostCardContainer.appendChild(latestPostCard);

    });

    
    
};
loadLatestCards("");
// loadPosts("");