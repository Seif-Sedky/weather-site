
const apiKey = '35TYNDS4K76DUUL3TFZUPCU69';

async function requestData(city) {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=35TYNDS4K76DUUL3TFZUPCU69&contentType=json`);
    response = await response.json();
    return extractData(response);
}

function extractData(response) {
    let description = response.description;
    let feelsLike = response.currentConditions.feelslike;
    let condition = response.currentConditions.conditions;
    let humidity = response.currentConditions.humidity;
    let address = response.address;
    let days = [response.days[1], response.days[2], response[3]];
    return { description, feelsLike, condition, humidity, address, days };
}

export function getData(city) {
    return requestData(city);
}
