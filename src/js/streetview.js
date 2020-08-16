
// Global constants Cutting off the Globe top and bottom
const LATITUDE_MIN = -55; // Max is -85
const LATITUDE_MAX = 70; // Max is 85
const LONGITUDE_MIN = -180;
const LONGITUDE_MAX = 180;

//const SOUTH_ATLANIC = { lat_max: 0, lat_min: -55, lng_max: 5, lng_min: -34 }
const EUROPE = { lat_max: 71, lat_min: 35, lng_max: 38, lng_min: -18 }

// const OCEANS = [
//   "ChIJBa8MIv1AJBMRD-ycEaSqETc", // "Tyrrhenian Sea"
//   "ChIJ_7hu48qBWgYRT1MQ81ciNKY", // "Atlantic Ocean"
//   "ChIJ60OJPWsTLUYRA2vzEgdY4q4", // "North Sea"
//   "ChIJKxsgiNnX9EYRs0xH6HoJQws", // "Baltic Sea"
// ]

let panorama;
let streetView_lat;
let streetView_lng;

// generates random lat and long
const rng = (min, max) => {
  return Math.random() * (max - min) + min;
}

// // Takes a lat and lng and returns True if in South Atlanic
// const isOcean = (lat, lng) => {
//   if ((lat <= SOUTH_ATLANIC.lat_max && lat >= SOUTH_ATLANIC.lat_min) && (lng < SOUTH_ATLANIC.lng_max && lng > SOUTH_ATLANIC.lng_min)) return true;
//   return false;
// }

// Takes a lat and lng and returns True if in europe
const isEurope = (lat, lng) => {
  if ((lat <= EUROPE.lat_max && lat >= EUROPE.lat_min) && (lng < EUROPE.lng_max && lng > EUROPE.lng_min)) return true;
  return false;
}

// Entry point
async function getCoords() {
  let lat = rng(LATITUDE_MIN, LATITUDE_MAX)
  let lng = rng(LONGITUDE_MIN, LONGITUDE_MAX)
  while (!isEurope(lat, lng)) {
    lat = rng(LATITUDE_MIN, LATITUDE_MAX)
    lng = rng(LONGITUDE_MIN, LONGITUDE_MAX)
  }
  console.log("Found europe", lat, lng)
  getStreetView(lat, lng)
}

const getStreetView = async (lat, lng) => {

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAah7uvsVLhk3A0aHbtKl4IocqE5DV4Zq8`)
  let data = await response.json()

  console.log(data)
  //console.log(data.status)

  const result_count = Object.keys(data.results).length

  console.log(result_count)
  //Filter out bad results
  if (data.status === "ZERO_RESULTS") {
    console.log("Zero results so trying again...")
    getCoords()
  }
  // if (result_count === 0){
  //   console.log("Zero results so trying again...")
  //   getCoords()
  //   return
  // }
  if (data.results[0].geometry.location_type === "APPROXIMATE"){
    console.log("Result is a large mass so trying again...")
    getCoords()
    return
  }
  // else if (OCEANS.includes(data.results[0].place_id)) {
  //   console.log("This is an ocean so trying again...")
  //   getCoords()
  //   return
  // }
  // else if (result_count === 2 && OCEANS.includes(data.results[1].place_id)) {
  //   console.log("This is an ocean[1] so trying again...")
  //   getCoords()
  //   return
  // }
  else {
    // call the function with the vetted coords
    getStreet(new google.maps.LatLng(lat, lng))
  }
}


// This is run from the callback
function getStreet(latLng) {
  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
  let streetViewService = new google.maps.StreetViewService();
  streetViewService.getPanorama({ location: latLng, radius: 50000, preference: 'best', source: 'outdoor' }, renderSV)

}

// Callback method that draws the given location
const renderSV = (data, status) => {
  if (status === google.maps.StreetViewStatus.OK) {
    console.log(data)
    let pano_id = data.location.pano
    panorama.setPano(pano_id)
    streetView_lat = data.j[pano_id].lat
    streetView_lng = data.j[pano_id].lng
    console.log(`SV Coords: ${streetView_lat},${streetView_lng}`)
  } else {
    console.log(status)
    getCoords()
  }
}

