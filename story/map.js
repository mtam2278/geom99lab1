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

    
// Move eqfeed_callback function definition here
function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}
window.eqfeed_callback = eqfeed_callback;
window.initMap = initMap;

export {};


