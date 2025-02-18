document.addEventListener('DOMContentLoaded', () => {
    const fetchPlanetButton = document.getElementById('fetchPlanetData');
    const fetchSpeciesButton = document.getElementById('fetchSpeciesData');
    const planetDataList = document.getElementById('planetDataList');
    const speciesDataList = document.getElementById('speciesDataList');

    // Initially, clear the planetDataList (no data should show on page load)
    planetDataList.innerHTML = '';
    speciesDataList.innerHTML = '';

    // API URLs for planets and species
    const apiUrls = {
        planet: 'https://swapi.tech/api/planets/1/',   // Default planet endpoint
        species: 'https://swapi.tech/api/species/3/'   // Default species endpoint
    };

    // Function to fetch data from the API
    const fetchData = async (url, dataType) => {
        try {
            let listToUpdate = dataType === 'planet' ? planetDataList: speciesDataList;
            listToUpdate.innerHTML = '<li>Loading...</li>';

            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch data.');

            const data = await response.json();
            console.log('Fetched Data:', data);

            if (data && data.result && data.result.properties) {
                displayData(data, listToUpdate, dataType);

            } else {
                listToUpdate.innerHTML = '<li>No valid data returned from the API.</li>';
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            listToUpdate.innerHTML = '<li>Failed to fetch data. Please try again later.</li>';
        }
    };

    const displayData = (data, list, dataType) => {
        let content = '';
        const properties = data.result.properties;

        if (dataType === 'planet') {
            content = `
            <strong>Planet:</strong> ${properties.name}<br>
            <strong>Climate:</strong> ${properties.climate}<br>
            <strong>Population:</strong> ${properties.population}<br>
            <strong>Terrain:</strong> ${properties.terrain}
            `;
        } else if (dataType === 'species') {
            content = `
            <strong>Species:</strong> ${properties.name}<br>
            <strong>Classification:</strong> ${properties.classification}<br>
            <strong>Language:</strong> ${properties.language}
            `;
        }
        list.innerHTML = `<p>${content}</p>`;
    };

    if (fetchPlanetButton) {
        fetchPlanetButton.addEventListener('click', () => {
            console.log('Fetching planet data...');
            fetchData(apiUrls.planet, 'planet');
        });
    }

    if (fetchSpeciesButton) {
        fetchSpeciesButton.addEventListener('click', () => {
            console.log('Fetching species data...');
            fetchData(apiUrls.species, 'species');
        });
    }
});


