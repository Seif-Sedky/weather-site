
const apiKey = '35TYNDS4K76DUUL3TFZUPCU69';

async function requestData(city) {
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=35TYNDS4K76DUUL3TFZUPCU69&contentType=json`);
    response = await response.json();
    return extractData(response);
}

function extractData(response) {
    console.log(response);
    let wind = response.currentConditions.windspeed;
    let feel = response.currentConditions.feelslike;
    let condition = response.currentConditions.conditions;
    let humidity = response.currentConditions.humidity;
    let address = response.resolvedAddress;
    let temp = response.currentConditions.temp
    let days = [response.days[1], response.days[2], response.days[3]];
    return { feel, condition, humidity, address, days, temp, wind };
}

export function getData(city) {
    return requestData(city);
}
