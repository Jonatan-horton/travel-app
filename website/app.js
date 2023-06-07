/* Personal API key for OpenWeatherMap API*/
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=58163d165072b2e4eb461b90e9804a23';

// New date stored in a variable to be displayed
let d = new Date()
let dateToday =  d.getMonth() + '/' + d.getDay() + '/' + d.getFullYear();

// Event listener for the click
document.getElementById('generate').addEventListener('click', getWeather);

// Function that will gather information and execute it once click has been used.
function getWeather(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip-input').value;
    const userFeeling = document.getElementById('user-feeling').value;
    getWeatherInfo(baseURL, zipCode, apiKey)
    .then(function (weatherData) {
        const temperature = weatherData.main.temp;
        const city = weatherData.name;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const windSpeed = weatherData.wind.speed;
        const humidity = weatherData.main.humidity;
        const feeling = userFeeling;
        const country = weatherData.sys.country;
        // Weather info posted to the server
        postData('/add', {
            temperature, 
            city,
            description, 
            icon, 
            windSpeed,
            humidity,
            feeling,
            country
        }).then(() => {updateUI();})
        // updateUI function to be called after the click is fired off and the weather info is gathered
    });
}

// Takes the url + zip + API and calls the API for the data
const getWeatherInfo = async (baseURL, zipCode, apiKey) => {

    const response = await fetch(baseURL + zipCode + apiKey)
    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } 
    catch(error) {
        console.log("error", error);
    }
};

// POST function to server
async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
}
// GET function that gets the information from the server
async function updateUI() {
    const response = await fetch('/retrieve');
    const lastEntry = await response.json();
    document.querySelector('.city').innerText = "Weather in " + lastEntry.city + ", " + lastEntry.country;
    document.querySelector('.temperature').innerText = Math.floor(lastEntry.temperature) + "°F";
    document.querySelector('.description').innerText = lastEntry.description;
    document.querySelector('.date').innerText = dateToday;
    document.querySelector('.humidity').innerText = "Humidity: " + lastEntry.humidity + "%";
    document.querySelector('.wind').innerText = "Wind Speed: " + lastEntry.windSpeed + " " + "mph";
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + lastEntry.icon +"@2x.png";
    document.querySelector('.content').innerText = lastEntry.feeling;
}
