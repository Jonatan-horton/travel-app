// server elements required
const bodyParser = require('body-parser')
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

//Middleware
app.use(urlencoded({ exnteded: false}));
app.use(json());

//Cross origin allowance
app.use(cors());

// Internalizing project main folder
app.use(static('dist'));

//API's and their URL's
const geoNameURL = 'http://api.geonames.org/postalCodeSearchJSON?placename=';
const geoNameKey = '&maxRows=10&username=travelapp2023';
const weatherBitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?city=';
const weatherBitKey = '&key=8c0409b4b7ee441ab6163b24fa5fd992';
const pixaBayURL = 'https://pixabay.com/api/?key='+pixaBayKey+"&q="+encodeURIComponent('');
const pixaBayKey = '37141574-2ddc101cd3b4e55a33814b42e';

// spin up server
app.listen(3000, () => console.log('running on localhost 3000'));

// Empty array to store project data
let projectData = {};

app.get('/', function (req, res) {
    res.send('dist/index.html');
});

// Post route that collects user data and stores it in "projectData" object
app.post('/clientData', async (req, res) => {
    const data = req.body;
    projectData = data;
    console.log(projectData);

    const geonamesUrl = await fetch(`${geoNamesRoot}${data.city}${geoNamesApiKey}${geoNamesParams}`, {
        method: 'POST'
    });

    try {
        const geoData = await geonamesUrl.json();
        projectData['long'] = geoData.geonames[0].lng;
        projectData['lat'] = geoData.geonames[0].lat;
        projectData['name'] = geoData.geonames[0].name; //toponymName
        projectData['countryName'] = geoData.geonames[0].countryName;
        projectData['code'] = geoData.geonames[0].countryCode;
        console.log('apiData ++++>', projectData)
        res.send(projectData);
    } catch (err) {
        console.log("error", err);
    }

});

// Endpoint for the weatherBit API
app.get('/getWeatherbit', async (req, res) => {
    console.log(`Request latitude is ${projectData.lat}`);
    console.log(`Request longitude is ${projectData.long}`);
    const lat = projectData.lat;
    const long = projectData.long;
    const weatherbitURL = `${weatherBitRoot}lat=${lat}&lon=${long}${weatherBitApiKey}`;
    console.log(`Weatherbit URL is ${weatherbitURL}`);
    try {
        const response = await fetch(weatherbitURL);
        
        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Weatherbit API. Response status ${response.status}`);
            res.send(null);
        }
        const weatherbitData = await response.json();
        projectData['icon'] = weatherbitData.data[0].weather.icon;
        projectData['description'] = weatherbitData.data[0].weather.description;
        projectData['temp'] = weatherbitData.data[0].temp;
        res.send(weatherbitData);
        console.log(weatherbitData);
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`);
        res.send(null);
    }
})

// Endpoint for the Pixabay API
app.get('/getPix', async (req, res) => {
    console.log(`Pixabay request city is ${projectData.name}`);
    const city = projectData.name;
    let pixabayURL = `${pixabayRoot}${pixabayApiKey}&q=${city}${pixabayParams}`;
    console.log(`Pixabay URL is ${pixabayURL}`);
    try {
        let response = await fetch(pixabayURL);
        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Pixabay API. Response status ${response.status}`);
            res.send(null);
        }
        let pixData = await response.json();
        projectData['image1'] = pixData.hits[0].webformatURL;
        projectData['image2'] = pixData.hits[1].webformatURL;
        projectData['image3'] = pixData.hits[2].webformatURL;
        res.send(pixData);
        console.log(image1, image2, image3);
        image1, image2, image3 = projectData;

        // If no photo was returned for city, get one for the country instead
        if (responseJSON.total == 0) {
            const country = projectData.countryName;
            console.log(`No photo available for ${city}. Finding photo for ${country}.`);
            pixabayURL = `${pixabayRoot}${country}${pixabayApiKey}${pixabayParams}`;
            console.log(`Pixabay country search URL is ${pixabayURL}`);
            response = await fetch(pixabayURL)
            // Checks for failed data transfer from API, returns null
            if (!response.ok) {
                console.log(`Error connecting to Pixabay. Response status ${response.status}`)
                res.send(null)
            }
            responseJSON = await response.json()
        }

        res.send(responseJSON)
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`)
        res.send(null)
    }
})

// endpoint for REST api
app.get('/getRest', async (req, res) => {
    console.log('Calling rest API');
    const country = projectData.countryName;
    const restUrl = `https://restcountries.us/rest/v2/name/${country}`;
    console.log(`Rest API url is ${restUrl}`);
    try {
        const response = await fetch(restUrl);

        // Checks for failed data transfer from API, returns null
        if (!response.ok) {
            console.log(`Error connecting to Rest API. Response status ${response.status}`);
            res.send(null)
        }
        const restData = await response.json();
        projectData['countryCode'] = restData[0].alpha2Code;
        projectData['callingCode'] = restData[0].callingCodes;
        projectData['currency'] = restData[0].currencies[0].name;
        projectData['currencySym'] = restData[0].currencies[0].symbol;
        projectData['language'] = restData[0].languages[0].name;
        projectData['flag'] = restData[0].flag;
        res.send(restData);
        console.log(restData);
        // If failed connection to API, return null
    } catch (error) {
        console.log(`Error connecting to server: ${error}`);
        res.send(null);
    } 
})

// GET endpoint gets the data for the UI
app.get('/getData', (req, res) => {
    console.log(projectData);
    res.send(projectData);
    res.json({message: 'Data recieved'});
})

// Endpoint for testing express server
app.get('/testEndpoint', async (req, res) => {
    res.json({message: 'The endpoint test passed!'})
  })


module.exports = app;