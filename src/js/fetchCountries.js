export const fetchCountries = (name) => {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;flag;languages`)
        .then(response => {
            if (!response.ok) throw new Error('Request is failed');
            return response.json()
        })
}