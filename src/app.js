const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
hbs.registerPartials(partialsPath) ;
app.set('view engine', 'hbs')
app.set('views', viewsPath)


app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Weather',
        title: 'Weather app',
        name: 'Dan A',
        description: 'Use this site to get the weather!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page',
        title: 'About page',
        name: 'Dan A'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        pageTitle: 'Help',
        helpText: 'I can help you a lot!',
        title: 'Help me, help you!',
        name: 'Dan'}
    );
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: "Please provide an address."
        })
    }
    geocode(req.query.address, (error, {latitude , longitude, location} = {}) => {
        if (error){
            return res.send({ 
                         error
                    })
        }

        forecast( latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send ({error})
            }
            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404-help', {
        pageTitle: 'Not Found',
        title: 'Help article not found!',
        errorMessage: '<a href="/help">Back to help!</a>'

    })
})
app.get('*', (req, res) => {
    pageTitle: 'Weather',
    res.render('404', {
        pageTitle: 'Not Found',
        title: 'This is not the 404 you are looking for!',
        errorMessage: '<a href="/">Back home!</a>'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});