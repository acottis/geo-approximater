
const btn_guess = document.getElementById("btn_guess")

// Entry point to get a StreetView
getCoords()

btn_guess.addEventListener("click", (e) => {
    console.log("lat diff: ", streetView_lat - guess_lat)
    console.log("lng diff: ", streetView_lng - guess_lng)

    // Get the KM difference
    const result = getDistanceKM(streetView_lat, streetView_lng, guess_lat, guess_lng)
    console.log(`You were ${result} Kilometers away`)
})


// Maths I dont understand
const getDistanceKM = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

// Refactored deg to rad
const deg2rad = (deg) => { return deg * (Math.PI / 180) }