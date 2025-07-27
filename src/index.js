import './index.css';
import { getData } from './utils/api';
import { displayContent } from './utils/content-display';
import { displayError } from './utils/error-display';

function DOM() {
    const input = document.querySelector('.search-bar');
    const address = document.querySelector('.country')
    const summary = document.querySelector('.summary');
    const degree = document.querySelector('.degree');
    const feel = document.querySelector('.feel');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const days = document.querySelectorAll('.day');
    const minMaxTemps = document.querySelectorAll('.min-max-temp');

    return { input, summary, degree, feel, wind, humidity, days, minMaxTemps,address };
}


function initializeEventListener() {
    let dom = DOM();

    dom.input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && dom.input.value) {
            const value = dom.input.value;
            let p = new Promise((resolve, reject) => {
                getData(value)
                    .then(data => resolve(data))
                    .catch(error => reject(error));
            }).then(response => displayContent(response, dom))
                .catch(error => displayError(error, dom));

        }
    });
}




initializeEventListener();