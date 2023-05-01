var form = document.forms.cityInputForm;
form.search.onclick = sendRequest;
form.cityName.addEventListener('keydown', function(event) {
    if (event.keyCode == 13) {
      sendRequest();
      event.preventDefault();
    }
});

function sendRequest() {
    var requestURL =
        'https://api.openweathermap.org/data/2.5/weather?q='
        + form.cityName.value
        + '&appid=d61b9849be56c1566a9c8a6e00b1d262';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var cityweather = request.response;
        displayResult(cityweather);
    }
}

function displayResult(weatherInfo) {
    var container = document.createElement('div');
    container.setAttribute("name", weatherInfo.name);
    container.classList = "container";

    var header1 = document.createElement('h1');
    header1.textContent = weatherInfo.name;
    container.appendChild(header1);

    var p1 = document.createElement('p');
    var p2 = document.createElement('p');
    var p3 = document.createElement('p');

    var temperatureReal = Math.round(weatherInfo.main.temp - 273.16);
    var temteratureFeels = Math.round(weatherInfo.main.feels_like - 273.16);
    p1.textContent = 'Фактична температура: ' + temperatureReal + " °C";
    p2.textContent = 'Відчувається як: ' + temteratureFeels + " °C";
    p3.textContent = 'Швидкість вітру: ' + weatherInfo.wind.speed + " m/s";

    container.appendChild(p1);
    container.appendChild(p2);
    container.appendChild(p3);

    document.body.appendChild(container);
}
