// Function to display movie data on the web page

function displayData(movies) {
    const container = document.querySelector(".Showing");
    container.innerHTML = "";
// Loop through each movie item in the movies array
    movies.forEach(item => {
        const dataItem = document.createElement("div");
        dataItem.classList.add('movie');
        
        const imgSrc = item.poster_path
            ? `https://image.tmdb.org/t/p/w185/${item.poster_path}`
            : 'placeholder.jpg';

        dataItem.innerHTML = `
            <img src="${imgSrc}" alt="${item.original_title} Poster">
            <h1>${item.original_title}</h1>
        `;
        container.appendChild(dataItem);
    });
}

// Function to search for a movie and display the results

async function searchAndDisplayMovie(searchQuery) {
    try {
        const response = await fetch(`/api/search?movieName=${searchQuery}`);
        if (!response.ok) {
            throw new Error("Failed to fetch movie data");
        }
        const movieData = await response.json();
        displayData(movieData);
    } catch (error) {
        console.error("Error fetching movie data:", error.message);
    }
}

// Add an event listener to the search form

document.getElementById("searchForm").addEventListener("submit", event => {
    event.preventDefault(); 
    const searchQuery = document.getElementById("search").value.trim();
    if (searchQuery === "") return; 
    searchAndDisplayMovie(searchQuery);
});