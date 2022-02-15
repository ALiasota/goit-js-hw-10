import { Notify } from 'notiflix/build/notiflix-notify-aio';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export default function fetchCountries(name) {
    const url = `${BASE_URL}${name}?fields=name,capital,languages,flag,population`;    
    return fetch(url)
        .then(response => {
            
            if (response.status == 404) {
                Notify.failure("Oops, there is no country with that name");
                // return;
            }
            return response.json(); 
        } 
            )        
}