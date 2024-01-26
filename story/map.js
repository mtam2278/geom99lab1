let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: { lat: 20.334999193082865, lng: -156.12237402661734 },
    mapTypeId: "terrain"
  });

  // Earthquake layer template taken from  https://developers.google.com/maps/documentation/javascript/earthquakes
  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script");

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src = "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js";
  document.getElementsByTagName("head")[0].appendChild(script);

  // Circle size increases with the magnitude of an earthquake at that particular location.
  map.data.setStyle(feature => {
    const magnitude = feature.getProperty("mag");
    return {
      icon: getCircle(magnitude)
    };
  });

  // Move eqfeed_callback function definition here
  function eqfeed_callback(results) {
    map.data.addGeoJson(results);
  }

  function getCircle(magnitude) {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "blue",
      fillOpacity: 0.5,
      scale: Math.pow(2, magnitude) / 2,
      strokeColor: "purple",
      strokeWeight: 1
    };
  }

  // Polygon template from google  https://github.com/googlemaps/js-samples/tree/main/samples/polygon-simple
  // Define the LatLng coordinates for the polygon's path.
  const triangleCoords = [
    { lat: 20.6490437201985, lng: -156.395026501021 },
    { lat: 20.671304758161305,  lng: -156.04398707268288 },
    { lat: 20.647883887363292, lng: -156.02075827126066 },
    { lat: 20.612759768623324,  lng: -156.41223395755407 },
    { lat: 20.70460570731437,  lng: -156.40126339997357}, 
    { lat: 20.6490437201985, lng: -156.395026501021 },
  ];

  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35
  });

  bermudaTriangle.setMap(map);
}

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
export {};


