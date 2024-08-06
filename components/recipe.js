document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#search-form');
    const submitButton = document.querySelector('button[type="submit"]');
    const searchResultContainer = document.querySelector('.search-result');

    submitButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const searchQuery = searchInput.value;
        searchInput.value = '';
        console.log('Search Query:', searchQuery);

        const searchUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=${encodeURIComponent(searchQuery)}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'RAPIDAPI-KEY',
                'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
        };

        try {
            const searchResponse = await fetch(searchUrl, options);
            const searchData = await searchResponse.json();

            searchResultContainer.innerHTML = '';

            for (const recipe of searchData.results) {
                const recipeId = recipe.id;
                const recipeDetailsUrl = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`;

                const detailsResponse = await fetch(recipeDetailsUrl, options);
                const recipeDetails = await detailsResponse.json();

                const recipeHTML = `
                    <div class="result-items">
                        <img class="recipe-img" src="${recipeDetails.image}" alt="${recipeDetails.title}">
                        <div class="flex-container">
                            <h1 class="recipe-title">${recipeDetails.title}</h1>
                            <a href="${recipeDetails.sourceUrl}" class="view-recipe-button">View Recipe</a>
                        </div>
                        <div class="result-data">
                            <p class="tags">${recipeDetails.dishTypes.join(', ')}</p>
                        </div>
                    </div>
                `;

                searchResultContainer.insertAdjacentHTML('beforeend', recipeHTML);
            }
        } catch (error) {
            console.error(error);
        }
    });
});

function openIndexPage() {
    window.location.href = '/index.html';
}
