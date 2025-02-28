// Your API key
const API_KEY = 'pub_7228430200cec4d4fdef28715b4c095c9c082';
const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=us&language=en`;

// DOM element to display news
const newsGrid = document.getElementById('news-grid');

// Fetch news from the API
async function fetchNews() {
    try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();

        if (data.status === 'success') {
            displayNews(data.results);
        } else {
            console.error('Error fetching news:', data.message);
        }
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Display news articles
function displayNews(articles) {
    newsGrid.innerHTML = ''; // Clear previous content

    articles.forEach((article) => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const image = document.createElement('img');
        image.src = article.image_url || 'https://via.placeholder.com/300x200'; // Fallback image
        image.alt = article.title;

        const title = document.createElement('h3');
        title.textContent = article.title;

        const description = document.createElement('p');
        description.textContent = article.description || 'No description available.';

        const readMore = document.createElement('a');
        readMore.href = article.link;
        readMore.target = '_blank';
        readMore.classList.add('read-more');
        readMore.textContent = 'Read More';

        newsCard.appendChild(image);
        newsCard.appendChild(title);
        newsCard.appendChild(description);
        newsCard.appendChild(readMore);

        newsGrid.appendChild(newsCard);
    });
}

// Fetch news when the page loads
fetchNews();