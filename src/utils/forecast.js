const request = require('postman-request');

const forecast = (lat, long, callback) => {    
    const url = 'http://api.weatherstack.com/forecast?access_key=becf333d32be3abbb0bcc8111e9b243f&query=' + lat + ',' + long ;
    // query the maps api
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
        console.log('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees Celsius. It feels like ${body.current.feelslike}.`);
        }

    })

}

module.exports = forecast;

