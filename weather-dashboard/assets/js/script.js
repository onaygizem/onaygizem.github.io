const apiKey = "4d8fb5b93d4af21d66a2948710284366";

var searchButton = document.querySelector(".searchButton")
var citySearchInput = document.querySelector(".citySearchInput")
var localStorage = window.localStorage;

var cityName = document.querySelector(".cityName")
var cityTemp = document.querySelector(".cityTemp")
var cityWind = document.querySelector(".cityWind")
var cityHumid = document.querySelector(".cityHumid")
var cityUV = document.querySelector(".cityUV")
var cityUVColor = document.querySelector(".cityUVColor")
var weatherLogo = document.getElementById("weatherLogo")



searchButton.addEventListener("click", function (e) {
    e.preventDefault();

    let citySearchInputVal = citySearchInput.value;

    if (citySearchInputVal != "") {
        search(citySearchInputVal)
    }
});


// Make the API calls to fetch data from openweatherapi
function search(citySearchInputVal) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearchInputVal}&appid=${apiKey}&units=metric`;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearchInputVal}&appid=${apiKey}&count=50`;


    fetch(url)
        .then(response => response.json())
        .then(mainData => {
            const { main, name, weather, wind, coord } = mainData;
            let iconurl = "http://openweathermap.org/img/w/" + weather[0]["icon"] + ".png";

            let lat = coord.lat;
            let lon = coord.lon;

            const UVUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(UVUrl).then(response => response.json())
            .then(uvData => {

                let uvNumber = uvData.current.uvi

                setMainCitySection(name, main.temp, wind.speed, main.humidity, iconurl, uvNumber);
                addToPreviousSearch(citySearchInputVal)
            })

            fetch(forecastUrl).then(response => response.json())
            .then(data => {
                get5DayForecast(data.list);
            })

        })
        .catch(() => {
            alert("Please search for a valid city 😩");
        });
}

function get5DayForecast(list) {
    let elementContainer = document.querySelector(".currentCityDaysRows");
    clearContent(elementContainer);

    let arrayCount = 0
    let nextDayCount = 1
    let forecastArray = []

    let div = document.createElement("div");
    div.className = "col currentCityDays";
    let dateTitle = document.createElement("h5");
    dateTitle.className = "detailedDate";
    let weatherLogo = document.createElement("img");
    weatherLogo.className = "detailedLogo"

    let temperature = document.createElement("p");
    temperature.className = "detailedTemp";
    let humidity = document.createElement("p");
    humidity.className = "detailedHum";


    let date = convertUnixTime(list[0].dt)
    dateTitle.textContent = date
    var iconurl = "http://openweathermap.org/img/w/" + list[0].weather[0]["icon"] + ".png";
    weatherLogo.src = iconurl
    temperature.textContent = "Temp: " + list[0].main.temp
    humidity.textContent = "Humidity: " + list[0].main.humidity

    elementContainer.appendChild(div);
    div.appendChild(dateTitle);
    div.appendChild(weatherLogo);
    div.appendChild(temperature);
    div.appendChild(humidity);

    // Iterate through the list and start getting values for each date
    while (forecastArray.length != 4) {
        let date = convertUnixTime(list[arrayCount].dt)
        let dateAfterSomeDays = new Date(new Date().getTime() + (nextDayCount * 24 * 60 * 60 * 1000));
        let dateCount = moment(dateAfterSomeDays).format("DD/MM/YYYY")

        if (date === dateCount) {
            forecastArray.push(1)

            let div = document.createElement("div");
            div.className = "col currentCityDays";
            let dateTitle = document.createElement("h5");
            dateTitle.className = "detailedDate";
            let weatherLogo = document.createElement("img");
            weatherLogo.className = "detailedLogo"

            let temperature = document.createElement("p");
            temperature.className = "detailedTemp";
            let humidity = document.createElement("p");
            humidity.className = "detailedHum";

            let date = convertUnixTime(list[arrayCount].dt)
            dateTitle.textContent = date
            var iconurl = "http://openweathermap.org/img/w/" + list[arrayCount].weather[0]["icon"] + ".png";
            weatherLogo.src = iconurl
            temperature.textContent = "Temp: " + list[arrayCount].main.temp
            humidity.textContent = "Humidity: " + list[arrayCount].main.humidity

            elementContainer.appendChild(div);
            div.appendChild(dateTitle);
            div.appendChild(weatherLogo);
            div.appendChild(temperature);
            div.appendChild(humidity);

            nextDayCount++
        }

        arrayCount++
    }
}

// This function adds the search to previous search section
function addToPreviousSearch(search) {
    // See if there is any previous search in local storage
    let previousSearchArrLoc = JSON.parse(localStorage.getItem("previousSearch"));

    if (previousSearchArrLoc) {
        // Dont add it to the list if it already exists
        if (!previousSearchArrLoc.includes(search)) {
            previousSearchArrLoc.push(search)
            localStorage.setItem("previousSearch", JSON.stringify(previousSearchArrLoc));
        }
    } else {
        let previousSearchArr = [];
        previousSearchArr.push(search);
        localStorage.setItem("previousSearch", JSON.stringify(previousSearchArr));
    }
    initializePreviousSearch()
}




// This function sets the previous search section elements
function initializePreviousSearch() {

    let previousSearchCont = document.querySelector(".previousSearch")

    // Clear content inside previous search container
    clearContent(previousSearchCont);
    // First check if there is any previous search items
    let previousSearchArrLoc = JSON.parse(localStorage.getItem("previousSearch"));

    if (previousSearchArrLoc) {
        previousSearchArrLoc.forEach((cityName) => {

            let liElement = document.createElement("li");
            liElement.className = "list-group-item";

            let aElement = document.createElement("a");
            aElement.textContent = cityName
            aElement.href = "#"

            previousSearchCont.appendChild(liElement);
            liElement.appendChild(aElement);

            aElement.addEventListener("click", function () {
                search(aElement.textContent);
            })
        })
    } else {

        let liElement = document.createElement("li");
        liElement.className = "list-group-item";

        let aElement = document.createElement("a");
        aElement.textContent = "No cities yet"

        previousSearchCont.appendChild(liElement);
        liElement.appendChild(aElement);

    }
}

function setMainCitySection(name, temp, speed, humidity, iconurl, uvNumber) {

    let datetime = moment(new Date()).format("DD/MM/YYYY");

    cityName.textContent = name + " " + `(${datetime})`;

    let weatherLogo = document.createElement("img");
    weatherLogo.id = "weatherLogo";
    cityName.appendChild(weatherLogo);

    weatherLogo.src = iconurl

    cityTemp.textContent = "Temp: " + temp;
    cityWind.textContent = "Wind: " + speed;
    cityHumid.textContent = "Humidity: " + humidity;
    cityUVColor.textContent = uvNumber;

    if(uvNumber >= 0 && uvNumber <= 2){
        cityUVColor.style.backgroundColor = "green";
    } else if(uvNumber >= 3 && uvNumber <= 5){
        cityUVColor.style.backgroundColor = "yellow";
    } else if(uvNumber >= 6 && uvNumber <= 7){
        cityUVColor.style.backgroundColor = "orange";
    } else if(uvNumber >= 8 && uvNumber <= 10){
        cityUVColor.style.backgroundColor = "red";
    } else if(uvNumber >= 11 ){
        cityUVColor.style.backgroundColor = "violet";
    }
    

}

function convertUnixTime(unixTime) {

    let humanDateFormat = moment.unix(unixTime).format("DD/MM/YYYY");

    return humanDateFormat;
}


// fucntion to create page content
const clearContent = (container) => {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

initializePreviousSearch()