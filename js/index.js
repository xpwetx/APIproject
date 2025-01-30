// URL for open API
const apiURL = 'https://github.com/xpwetx/APIproject.git';

// Button to trigger fetching data
const fetchDataButton = decoument.getElementById('fetchDataButton');

// Event listener for button
fetchDataButton.addEventListener('click', () => {
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        console.log('API Response:', data);
        document.getElementById('dataDisplay').textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
});