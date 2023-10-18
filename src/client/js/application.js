
import fetch from "node-fetch";

// This event listener listens for a click on the search button
document.getElementById("btn").addEventListener("click", userInput);


// Function that fires off when the click has been registered
async function userInput(e) {
  e.preventDefault();

  // Take the city and date when user inputs the data and store them in variables
  const city = document.getElementById("city-input").value;
  const date = document.getElementById("date-picker").value;

  // Get the current date.
  let currentDate = new Date().toLocaleDateString();

  if (parseInt(date) >= parseInt(currentDate)) {
    // Store the day month and year
    const day = date.slice(0, 2);
    const month = date.slice(3, 5);
    const year = date.slice(6, 10);

    // Then change the order so and store in a variable so we can use this format for weatherbit api
    const fixDate = year + "-" + month + "-" + day;

    await postData("/clientData", {
      city: city,
      date: fixDate,
    });

    // functions to call servers after post request
    await callServer("/getWeatherbit");

    await callServer("/getPix");

    await callServer("/getRest");

    const getPlanData = await callServer("/getData");

    console.log(getPlanData);
    updateUI();
  } else {
    alert("Please enter a valid date.");
  }
}

// post route for server
async function postData(url, tripData) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripData),
  });
}

// call to server for data
const callServer = async (url) => {
  const asyncParams = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, asyncParams);
  try {
    const data = await res.json();
    return data;
  } catch {
    console.log(`Error: ${res.statusText}`);
  }
};

// function that updates the UI with a call to the server
async function updateUI() {
    const response = await fetch("/getData");
    const uiData = await response.json();
    console.log(uiData);
    document.querySelector(".city-image").src = uiData.image1;
    document.querySelector(".image-icon").src = uiData.flag;
    document.querySelector(".list-country").innerHTML =
      uiData.name + ", " + uiData.countryCode;
    document.querySelector(".call-code").innerHTML = "+" + uiData.callingCode;
    document.querySelector(".currency").innerHTML =
      uiData.currency + "(" + uiData.currencySym + ")";
    document.querySelector(".language").innerHTML = uiData.language;
    document.querySelector(".city-name").innerHTML = uiData.name;
    document.querySelector(
      ".icon-image"
    ).src = `https://www.weatherbit.io/static/img/icons/${uiData.icon}.png`;
    document.querySelector(".description").innerHTML = uiData.description;
    document.querySelector(".temp").innerHTML = uiData.temp + "°C";
    document.querySelector(".departure").innerHTML = uiData.date;
    document.querySelector(".arrival").innerHTML = uiData.date;
  }

export { callServer, updateUI };