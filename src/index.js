import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import countryTmpl from './js/templates/country.hbs';


const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');

const refs = {
    searchBtn: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
}


refs.searchBtn.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (e) {
    refs.countryInfo.innerHTML = "";
    refs.countryList.innerHTML = "";
    const country = e.target.value.trim();
    if (country) {
        fetchCountries(country)
        .then(countries => renderCountry(countries))
        .catch(err => {        
        Notify.failure(err);
        });
    }
    
}

function renderCountry(countries) {
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    if (countries.length === 1) {        
        refs.countryInfo.innerHTML = countryTmpl(countries[0]);        
    }
    
    if (countries.length <= 10 && countries.length >= 2 ) {
        refs.countryList.innerHTML = countries.map(country => {
            return `<p><img src="${country.flags.svg}" alt="flag" width="20px"> ${country.name.official}</p>`
        }).join('');         
    }
}