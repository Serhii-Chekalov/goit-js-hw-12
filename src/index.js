import './css/styles.css';

const DEBOUNCE_DELAY = 300;

import { getRefs } from './js/refs';
import { fetchCountries } from './js/fetchCountries'
import Notiflix from "notiflix";
import debounce from 'lodash.debounce';

/** Components */
import List from './temlate/CountriesList.hbs'
import Card from './temlate/CountryCard.hbs'

document.addEventListener("DOMContentLoaded", (event) => {
    const refs = getRefs()
    const clearList = () => refs.CountryList.innerHTML = ''
    const clearCard = () => refs.СountryInfo.innerHTML = ''

    const inputHandler = debounce((event) => {
        if(!event.target.value.length) {
            clearList()
            return
        } 

        if(event.target.value.length > 10) {
            clearList()
            Notiflix.Notify.warning('Too many matches found. Please enter a more specific name!!!'); 
            return
        }

        fetchCountries(event.target.value).then(countries => {
            Notiflix.Notify.success('Success!!!'); 
            
            if(countries.length === 1) {
                clearList()
                const [findedCountry] = countries
                refs.СountryInfo.innerHTML = Card(findedCountry)
                return
            } else {
                clearCard()
                refs.CountryList.innerHTML = List(countries)
            }
        }).catch(() => {
            clearList()
            Notiflix.Notify.failure('Something went wrong!!!');
        })
    }, 1000);

    refs.SearchCountry.addEventListener("input", inputHandler);
});