export function displayContent(data, dom) {

    displayMainContent(data, dom);

    displayForecastContent(data, dom);

}

function displayMainContent(data, dom) {
    dom.address.textContent = data.address;
    dom.summary.textContent = data.condition;
    dom.degree.textContent = fahrenheitToCelsius(data.temp);
    dom.feel.textContent = data.feel;
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

    // Update minmax
}

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
