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
    fetchCountries(country)
    .then(countries => renderCountry(countries))
    .catch(err => {        
        Notify.failure("Oops, there is no country with that name");
      });
}

function renderCountry(countries) {
    if (countries.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    if (countries.length === 1) {
        refs.countryInfo.innerHTML = countryTmpl(countries[0]);
        Object.values(countries[0].languages).forEach(element => {            
            refs.countryInfo.insertAdjacentHTML('beforeend', `${element} `);
        });
        
        console.log(Object.values(countries[0].languages) );
    }
    
    if (countries.length < 10 && countries.length !== 1) {
        refs.countryList.innerHTML = countries.map(country => {
            return `<h1>${country.flag} ${country.name.official}</h1>`
        }).join('');         
    }
}