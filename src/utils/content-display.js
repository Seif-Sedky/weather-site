import cloudImg from '../imgs/cloud.png';
import rainImg from '../imgs/rain.png';
import sunImg from '../imgs/sun.png';
import thunderImg from '../imgs/thunder.png';


export function displayContent(data, dom) {

    displayMainContent(data, dom);

    displayForecastContent(data, dom);

}

function displayMainContent(data, dom) {
    dom.address.textContent = data.address;
    dom.summary.textContent = data.condition;
    dom.degree.textContent = fahrenheitToCelsius(data.temp);
    dom.feel.textContent = fahrenheitToCelsius(data.feel);
    dom.wind.textContent = data.wind;
    dom.humidity.textContent = data.humidity;
}

function displayForecastContent(data, dom) {
    // Update days 
    let nextDays = getNextThreeDays();
    let i = 0;
    for (let day of dom.days) {
        day.textContent = nextDays[i++];
    }

    i = 0;
    // Update minmax
    console.log(dom.minMaxTemps.length)
    for (let minmax of dom.minMaxTemps) {
        minmax.textContent = `${fahrenheitToCelsius(data.days[i].tempmin)}-${fahrenheitToCelsius(data.days[i].tempmax)}`;
        i++;
    }
}



export function updateColours(data, dom) {
    // Check if it's hot 
    const isHot = fahrenheitToCelsius(data.temp) > 35; 

    if (isHot) {
        document.documentElement.style.setProperty('--accent-color', '#ff4444');
    } else {
        // Reset to original blue color
        document.documentElement.style.setProperty('--accent-color', '#00d9ff');
    }
}

export function updateImages(data, dom) {
    const condition = data.condition.toLowerCase();
    let imageSrc = cloudImg; // Default

    // Determine image based on weather condition
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
        imageSrc = rainImg;
    } else if (condition.includes('sun') || condition.includes('clear') || condition.includes('fair')) {
        imageSrc = sunImg;
    } else if (condition.includes('thunder') || condition.includes('storm')) {
        imageSrc = thunderImg;
    } else if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('partly')) {
        imageSrc = cloudImg;
    }

    // Update all weather icons
    const weatherIcons = document.querySelectorAll('.weather-icon');
    weatherIcons.forEach(icon => {
        icon.src = imageSrc;
    });
}

//utility functions

function getNextThreeDays() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();

    const nextThreeDays = [];
    for (let i = 1; i <= 3; i++) {
        const dayIndex = (today + i) % 7;
        nextThreeDays.push(days[dayIndex]);
    }

    return nextThreeDays;
}


function fahrenheitToCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5 / 9;
    return parseFloat(celsius.toFixed(1));
}
