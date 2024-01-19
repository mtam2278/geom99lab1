function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  const markers = locations.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });
  // Add a marker clusterer to manage the markers.
  new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}
const locations = [
  { lat: 50.766486, lng: -93.43209},
  { lat: 46.969783, lng: -84.702083},
  { lat: 44.621922, lng: -78.0477976},
  { lat: 48.003692, lng: -89.580631},
  { lat: 43.8052, lng: -81.713},
  { lat: 42.65499, lng: -81.012649},
  { lat: 42.646896, lng: -80.811954},
  { lat: 47.958493, lng: -84.26831},
  { lat: 44.0101, lng: -77.7416},
  { lat: 48.675, lng: -91.1258},
  { lat: 48.839408, lng: -87.4438656},
  { lat: 49.417357, lng: -82.139301},
  { lat: 46.06529, lng: -79.76884},
  { lat: 45.059854, lng: -75.671649},
  { lat: 42.8568061, lng: -79.5507386},
  { lat: 42.324081, lng: -81.847002},
  { lat: 49.6816, lng: -94.2359},
  { lat: 46.29, lng: -78.86},
  { lat: 43.91122, lng: -77.24169},
  { lat: 49.467516, lng: -91.545418},
  { lat: 44.6734319, lng: -81.2570725},
  { lat: 42.815804, lng: -79.957876},
  { lat: 44.764794, lng: -76.72384},
  { lat: 44.3217, lng: -79.325},
  { lat: 44.92306, lng: -78.07121},
  { lat: 48.68388629, lng: -89.60598495},
  { lat: 44.82982, lng: -76.57669},
  { lat: 49.429325, lng: -94.047582},
  { lat: 44.88824, lng: -79.75216},
  { lat: 48.50637, lng: -88.728676},
  { lat: 47.197998, lng: -80.693104},
  { lat: 46.411881, lng: -81.844265},
  { lat: 44.441793, lng: -79.758725},
  { lat: 45.62355, lng: -80.41577},
  { lat: 46.720316, lng: -80.363981},
  { lat: 45.16050292, lng: -79.9717354},
  { lat: 43.24841, lng: -81.82342},
  { lat: 51.22, lng: -80.65},
  { lat: 42.700398, lng: -80.329666},
  { lat: 45.55561, lng: -74.4449},
  { lat: 50.59, lng: -89.55},
  { lat: 47.33304, lng: -82.52381},
  { lat: 44.4985, lng: -80.047283},
  { lat: 42.090666, lng: -82.442196},
  { lat: 48.713534, lng: -85.649972},
  { lat: 46.622078, lng: -81.455217},
  { lat: 51.104, lng: -94.288}  
];