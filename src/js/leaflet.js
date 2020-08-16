
let guess_lat;
let guess_lng;

let map = L.map('map').setView([0, 0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:17,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// L.marker([51.5, -0.09]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();



let marker = L.marker()

const markMap = (event) => {
    marker.removeFrom(map)
    guess_lat = event.latlng.lat
    guess_lng = event.latlng.lng
    marker.setLatLng(event.latlng)
    marker.addTo(map)
    console.log(`Guess Coords: ${guess_lat},${guess_lng}`)
}

map.on('click', markMap);