document.addEventListener('DOMContentLoaded', () => {
    const fetchPlanetButton = document.getElementById('fetchPlanetData');
    const fetchSpeciesButton = document.getElementById('fetchSpeciesData');
    const planetDataList = document.getElementById('planetDataList');

    // URL for open API
    let apiUrl = 'https://swapi.tech/api/planets/1/'; 

    const fetchData = (url) => {
        planetDataList.innerHTML = '<li>Loading...</li>';

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API response:', data);

                // Check if data is available
                if (data && data.result && data.result.properties) {
                    let content = ''; // check if planet or species data 
                    if (url.includes('planets')){
                        const planetName = data.result.properties.name;
                        const planetClimate =data.result.properties.climate;
                        const planetPopulation = data.result.properties.population;
                        const planetTerrain = data.result.properties.terrain; 
                        content = `Planet name: ${planetName}, Climate: ${planetClimate}, Population: ${planetPopulation}, Terrain: ${planetTerrain}`;
                    } else if (url.includes('species')) {
                        const speciesName = data.result.properties.name;
                        const speciesClassification = data.result.properties.classification;
                        const speciesLanguage = data.result.properties.language;
                        content = `Species name: ${speciesName}, Classification: ${speciesClassification}, Language: ${speciesLanguage}`;
                    }
                    planetDataList.innerHTML = `<li>${content}</li>`;
                } else {
                    planetDataList.innerHTML = '<li>No data available.</li>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                planetDataList.innerHTML = '<li>Failed to fetch data. Please try again later.</li>'
            });
        };

        // Event listener for Planet button
        if (fetchPlanetButton) {
            fetchPlanetButton.addEventListener('click', () => {
                apiUrl = 'https://swapi.tech/api/planets/5';
                fetchData(apiUrl);
            });
        }

        // Event listener for Species button
        if (fetchSpeciesButton) {
            fetchSpeciesButton.addEventListener('click', () => {
                apiUrl = 'https://swapi.tech/api/species/3/';
                fetchData(apiUrl);
            });
        }
         // Initially load planet data by default
         fetchData(apiUrl);
    });
                    