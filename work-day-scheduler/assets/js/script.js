// Declare variables
var localStorage = window.localStorage;
var currentDay = document.querySelector("#currentDay");
var mainContainer = document.querySelector(".container");
var currentTime = { text: moment().format("h:00 A"), hour: moment().hour() };
var timeNow = moment();
var timeArray = [];

// Sey the current day text
currentDay.textContent = timeNow.format("dddd MMMM DD, YYYY");


// Function to create an array which will have text and hour of the day
function createAnHoursArray(){
    for(let x=0; x<25; x++){
        let text = moment().hour(x).format("h:00 A");
        let hour = moment().hour(x);

        timeArray.push({text, hour})
    }
} 

// Call the createAnHoursArray function
createAnHoursArray()


// Return the correct color for the each time of the day
function color(time) {
    return time.text === currentTime.text
        ? "#ed9999"
        : time.hour < timeNow
            ? "#ece7e7"
            : "#9de99d";
}


// Iterate through each time and create html elements
timeArray.forEach((hr) => {

    let grid = document.createElement("form");
    grid.className = "grid grid-cols-12  border-gray-500"
    grid.setAttribute("data-name", hr.text) 

    let time = document.createElement("div");
    time.className = "flex items-center justify-center col-span-2 h-16"
    time.textContent = hr.text

    let textArea = document.createElement("textarea");
    textArea.className =   `col-span-8 h-16 p-6`;
    let backgroundColor = color(hr);
    textArea.style.backgroundColor = backgroundColor;
    textArea.setAttribute("name", hr.text);
    textArea.textContent = localStorage.getItem(hr.text) || "";


    textArea.addEventListener("keydown", function(e){
        if (e.key == "enter" && !e.shiftKey) {
            e.preventDefault();
            return false;
        }
    })


    let saveButton = document.createElement("button");
    saveButton.className = "col-span-2 h-16 bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition duration-500 ease-in-out";
    saveButton.type = "submit"

    let saveIcon = document.createElement("i");
    saveIcon.className = "fas fa-save text-xl";
    saveButton.appendChild(saveIcon);

    
    grid.addEventListener('submit', logSubmit);

    function logSubmit(event){
        event.preventDefault();
        let value = textArea.value;
        localStorage.setItem(hr.text, value);
    }

    grid.appendChild(time);
    grid.appendChild(textArea);
    grid.appendChild(saveButton);

    mainContainer.appendChild(grid);
});
