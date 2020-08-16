const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');

const KEY = functions.config().geoid.key;

const app = express();

app.get('/api/timestamp', (req, res) => {
    res.send(`${Date.now()}`);
})

app.get('/api/geoid', async (req, res) => {
    try {
        console.log(req.query);
        let lat = req.query.lat
        let lng = req.query.lng
        const geo_response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${KEY}`)
        res.status(200)
        res.json(geo_response.data)
        console.log(functions.config())
    }
    catch (error) {
        console.log(error)
        res.status(500)
        res.send(error)
    }
})

exports.app = functions.https.onRequest(app);


