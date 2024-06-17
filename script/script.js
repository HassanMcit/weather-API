const city = document.getElementById("city");
const row = document.getElementById("row");
let today;
let data;
let link = document.querySelectorAll(".nav-link");

for (let i of link) {
    i.addEventListener('mouseenter', function (e) {
        e.target.style.borderColor = "#12A0BE";
    });

    i.addEventListener('mouseleave', function (e) {
        e.target.style.borderColor = "#000";
    });
}

city.addEventListener('input', function (e) {
    getTemp(e.target.value);
});

async function getTemp(a) {
    try {
        let respone = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
        data = await respone.json();
        display(true);
    }
    catch(err) {
        display(false)
    }
}

function display(isTrue) {
    let box = "";
    today = new Date();
    if (isTrue) {
        let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let month = ["January", "February", "March", "April", "May", "June", "July", "August",
            "September", "October", "November", "December"];
        box = `
            <div class="col-12 col-md-4">
                <div class="card dark-light text-white  border-end-0">
                    <div class="card-body pt-0 px-0 rounded-0">
                        <div class="d-flex  rounded-2 bg-dark bg-opacity-50  justify-content-between align-items-center">
                            <p class="card-title ps-2 my-2 opacity-50 fw-normal">${day[today.getDay()]}</p>
                            <p class="card-title pe-2 my-2 opacity-50 fw-normal">${today.getDate()}${month[today.getMonth()]}</p>
                        </div>
                        <p class="card-text px-2 mb-0 fs-1">${data.location.name}</p>
                        <p class="card-text px-2 country">${data.location.country}</p>
                        <div class="d-flex justify-content-between align-content-center">
                            <h1 class="ps-2">${data.current.temp_c}&#176C</h1>
                        </div>
                        <img src="https://${data.current.condition.icon}" alt="" width="90">
                            <p class="text-primary text-opacity-75 ps-2 fs-4">${data.current.condition.text}</p>
                            <div class="ps-2">
                                <span class="opacity-50 me-2"><i class="fa-solid fa-umbrella me-2"></i>${data.current.humidity}%</span>
                                <span class="opacity-50 me-2"><i class="fa-solid fa-wind me-2"></i>${Math.round((data.current.wind_mph) * 1.60934)}km/h</span>
                                <span class="opacity-50 me-2"><i class="fa-solid fa-compass me-2"></i>East</span>
                        </div>
                    </div>
                </div>
            </div>`;
        for (let i = 1; i < data.forecast.forecastday.length; i++) {
            today = new Date(data.forecast.forecastday[i].date);
            box += `
            <div class="col-12 col-md-4 xx-${i}">
                <div class="card text-bg-dark border-start-0 border-end-0">
                    <div class="card-body pt-0 px-0 rounded-0">
                        <div class="d-flex  rounded-2  justify-content-between align-items-center">
                            <p class="card-title ps-2 my-2 opacity-50 fw-normal">${day[today.getDay()]}</p>
                            <p class="card-title pe-2 my-2 opacity-50 fw-normal">${today.getDate()}${month[today.getMonth()]}</p>
                        </div>
                        <p class="card-text px-2 mb-0 fs-1 text-center">${data.location.name}</p>
                        <p class="card-text px-2 country text-center">${data.location.country}</p>
                        <img class="mx-auto d-block mb-4" src="https://${data.forecast.forecastday[i].day.condition.icon}" alt="" width="100">
                        <h3 class="text-center">${data.forecast.forecastday[i].day.maxtemp_c}&#176C</h3>
                        <h6 class="text-center">${data.forecast.forecastday[i].day.mintemp_c}&#176C</h6>
                            <p class="text-primary text-opacity-75 text-center mt-4 fs-4">${data.forecast.forecastday[i].day.condition.text}</p>
                            <div class="ps-2 text-center yyy">
                                <span class="opacity-50 me-2"><i class="fa-solid fa-umbrella me-2"></i>${data.forecast.forecastday[i].day.avghumidity}%</span>
                                <span class="opacity-50 me-2"><i class="fa-solid fa-wind me-2"></i>${Math.round((data.current.wind_mph) * 1.60934)}km/h</span>
                                <span class="opacity-50 me-2"><i class="fa-solid fa-compass me-2"></i>East</span>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    } else {
        box = `<div class="col-12 h-100 position-relative d-flex flex-column justify-content-center align-items-center h-75 top-0 start-0 end-0 bottom-0 bg-dark p-3 ">
                    <img src="image/404.png" class="w-50 mx-auto pb-3">
                    <h1 class="text-white fs-1 mt-5">oops incorrect location ! <img src="image/Face-bad.png" alt="bad-face" width="60"/></h1>
                </div>`;
    }
    row.innerHTML = box;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    getYourCityName(position.coords.latitude, position.coords.longitude);
}

async function getYourCityName(lat, lon) {
    const response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=6670203fc70ea496613783bfg67ef0c`);
    const data = await response.json();
    getTemp(data.address.city);
}

getLocation();