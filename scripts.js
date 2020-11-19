mapboxgl.accessToken = 'pk.eyJ1IjoidGhld2hhdGRlZXAiLCJhIjoiY2toZ2xvdnpmMDFndzJycnZpa2pubDNtbyJ9.A1u_DJ9o7vMIaFJTeSZ5JA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9'
});

window.addEventListener('load', event => {
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );
    geoFindMe();
});


function geoFindMe() {
    let locationText = document.getElementById('loc_text');

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        var location_address = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBpp0OUjTw32W1WfH-6cLxYxxOsPO6KOa8`;
        
        fetch(location_address)
        .then(res => res.json())
        .then(data => {
            locationText.innerText = data.results[0].formatted_address
            map.flyTo({
                center: [
                    longitude,
                    latitude
                ],
                zoom: 17,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
        });
    }

    function error() {
        console.log('Unable to retrieve your location');
    }

    if(!navigator.geolocation) {
        locationText.innerText = 'Geolocation is not supported by your browser';
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

const _events = () => {
    document.getElementById('action_safe').addEventListener('click', event => {
    });
    document.getElementById('action_rescue').addEventListener('click', event => {
    });
}