document.addEventListener('DOMContentLoaded', () => {
    const apiKeyNews = 'f587118ebb334dd184053d1ed6dcd1e5'; 
    const apiKeyUnsplash = '7xU0k4aZoCqfVGc6f-PKBgOB_qloMdS87r2EU4CRK5k'; 
    const newsList = document.querySelector('.news-list');
    const buttons = document.querySelectorAll('.nav-bar button');

    function getUserLocation() {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => resolve(position.coords),
                    error => reject(error)
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }

    //Hard to say how much of a difference this function makes but its an attempt to get more article images by extracting keywords from the title, and pulling images from Upsplash
    function extractKeywords(title) {
        const stopWords = new Set(['the', 'and', 'is', 'in', 'at', 'of', 'to', 'The Washington Post']); 
        return title
            .toLowerCase()
            .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
            .split(/\s+/)
            .filter(word => !stopWords.has(word) && word.length > 2)
            .join(' ');
    }

    async function fetchNews(category, coords) {
        const location = 'us';
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&country=${location}&apiKey=${apiKeyNews}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    async function fetchUnsplashImage(query) {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${apiKeyUnsplash}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                return data.results[0]?.urls?.regular || '/images/news.jpg';
            } else {
                return '/images/news.jpg';
            }
        } catch (error) {
            console.error('Error fetching Unsplash image:', error);
            return '/images/news.jpg'; 
        }
    }

    async function displayNews(articles) {
        newsList.innerHTML = '';
        for (const article of articles) {
            const newsItem = document.createElement('div');
            newsItem.classList.add('news-item');
            const img = document.createElement('img');
            img.alt = article.title;
            img.classList.add('news-img');

            if (article.urlToImage) {
                img.src = article.urlToImage;
            } else {
                const keywords = extractKeywords(article.title);
                const imageUrl = await fetchUnsplashImage(keywords);
                img.src = imageUrl;
            }

            const link = document.createElement('a');
            link.href = article.url;
            link.target = '_blank';

            const title = document.createElement('p');
            title.classList.add('news-title');
            title.textContent = article.title;

            link.appendChild(title);
            newsItem.appendChild(img);
            newsItem.appendChild(link);
            newsList.appendChild(newsItem);
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const category = event.target.textContent.toLowerCase();
            buttons.forEach(btn => btn.classList.remove('selected'));
            event.target.classList.add('selected');
            try {
                const coords = await getUserLocation();
                fetchNews(category, coords);
            } catch (error) {
                console.error('Error getting location or fetching news:', error);
                fetchNews(category, { latitude: 37.7749, longitude: -122.4194 });
            }
        });
    });
    fetchNews('general', { latitude: 37.7749, longitude: -122.4194 }); // Default
});
