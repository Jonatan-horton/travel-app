# Travel-app
 # Webapplication Project for Front-End Web Developer nano-degree

 This project includes elements from different projects that I have build throughout the course.

# Description: 
User will input a city and departure date,

The use will receive: Summary of the inputs e.g City name and country information: Calling Code, Official Language, Currency

## Technologies
Project is created with:
 * Javascript
 * HTML
 * CSS
 * API from Geonames, Weatherbit, Pixabay and Rest Countries API

 ## Setup
 To setup this project, install dependencies: Node.js and Webpack
 ```
 $ npm install
 ```

 To run this project
 ```
 npm run build
 npm run start
 ```

The server runs on localhost:3000: Open a tab in your browser and type the following information:
https://localhost:3000/ - Enter City, Departure Date and click on submit button.

Once user has hit the submit icon, they will see: Name of the City, Weather, and Departure date

## Further detail to improve UI expeirence

- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
- Integrate the REST Countries API to pull in data for the country being visited.
- Incorporate icons into forecast.

