const datepicker = require("js-datepicker");

//Function that displays a calendar for date input
export const picker = datepicker("#date-picker", {
    showAllDates: true,
    formatter: (input, date, instance) => {
        const value = date.toLocaleDateString();
        //Displays the current date as a string ex: 02/23/2023
        input.value = value;
    },
});