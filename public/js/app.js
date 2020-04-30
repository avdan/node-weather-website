const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const getForecast = (address = '!') => {

    let obj

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGFuYXZyYW1lc2N1IiwiYSI6ImNrOWZxMjBjMjA4dTEzaGtjd3lncTNjN3IifQ.0uCS9PXIbpHcc4l0lvdPfw`)
    .then(response => response.json())
    .then(data => { 
        if (data.features.length === 0 ) {
            messageOne.textContent = 'Please input an actual location!'
        } else{
            obj = { 
                latitude: data.features[0].center[1],
                longitude: data.features[0].center[0],
                placeName:  data.features[0].place_name,
            }
            messageOne.textContent = obj.placeName;
            fetch('http://api.weatherstack.com/forecast?access_key=becf333d32be3abbb0bcc8111e9b243f&query=' + obj.latitude + ',' + obj.longitude, {
                mode: 'no-cors' // 'cors' by default
              })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                 messageTwo.textContent = `${data.current.weather_descriptions[0]}. It is ${data.current.temperature} degrees Celsius. It feels like ${data.current.feelslike}. The humidity is ${data.current.humidity}, the cloud cover is ${data.current.cloudcover}%. There are ${data.current.precip}% chances of precipitations.`
            });
        }
    });
}
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading...'

    
    if (location) {
        getForecast(location)

    } else {
        messageOne.textContent = 'Input a location, bub!'
    }
})

