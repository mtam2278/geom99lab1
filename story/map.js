// Story map intended to show areas earthquakes and areas of potential flooding in Hawaii

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

    // Polygon template from google  https://github.com/googlemaps/js-samples/tree/main/samples/polygon-simple
    // Create polygons representing flood areas which are roughly mapped using https://www.mauicounty.gov/1476/Susceptible-Flooding-Area-Maps
    // Define the LatLng coordinates for the polygon's path.
    const floodarea = [
      { lat: 20.6490437201985, lng: -156.395026501021 },
      { lat: 20.671304758161305,  lng: -156.04398707268288 },
      { lat: 20.647883887363292, lng: -156.02075827126066 },
      { lat: 20.58843832493746,  lng: -156.40530518434534 },
      { lat: 20.6490437201985, lng: -156.395026501021 },
    ];

    // Construct first polygon for area susceptible to flood
    const floodwarning = new google.maps.Polygon({
      paths: floodarea,
      strokeColor: "#00008B",
      strokeOpacity: 0.7,
      strokeWeight: 3,
      fillColor: "#00008B",
      fillOpacity: 0.5
    });

    floodwarning.setMap(map);

    const floodarea2 = [
      { lat: 20.903234388810226, lng: -156.91283781469863 },
      { lat: 20.917258027052483, lng: -156.86780078884186 },
      { lat: 20.83309654616203,  lng: -156.78350071480227 },
      { lat: 20.814207692342173, lng: -156.8360439116352  },
      { lat: 20.903234388810226, lng: -156.91283781469863 },
    ];

    // Construct second polygon area susceptible to flood
    const floodwarning2 = new google.maps.Polygon({
      paths: floodarea2,
      strokeColor: "#00008B",
      strokeOpacity: 0.7,
      strokeWeight: 3,
      fillColor: "#00008B",
      fillOpacity: 0.5
    });

    floodwarning2.setMap(map);
 // Construct third polygon area susceptible to flood
    const floodarea3 = [
      { lat: 20.90114672570202,  lng: -156.24740850989022 },
      { lat: 20.927765052420874, lng: -156.21135961939868 },
      { lat: 20.830248403437945, lng: -156.05926763380106 },
      { lat: 20.796551972362185, lng: -156.10595953005674 },
      { lat: 20.90114672570202,  lng: -156.24740850989022 },
    ];

    // Construct second polygon area susceptible to flood
    const floodwarning3 = new google.maps.Polygon({
      paths: floodarea2,
      strokeColor: "#00008B",
      strokeOpacity: 0.7,
      strokeWeight: 3,
      fillColor: "#00008B",
      fillOpacity: 0.5
    });

    floodwarning3.setMap(map);

    // Marker for  current Disaster Recovery Center in Hawaii taken from https://www.fema.gov/locations/hawaii
    new google.maps.Marker({
      position: { lat: 20.905056704961094, lng: -156.68378061748803 },
      map,
      title: "Lahaina Civic Center"
    })

  }
    function getCircle(magnitude) {
      return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "#ed0909",
        fillOpacity: 0.5,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: "purple",
        strokeWeight: 2
      };
    }

    
// Move eqfeed_callback function definition here
function eqfeed_callback(results) {
  map.data.addGeoJson(results);
}
window.eqfeed_callback = eqfeed_callback;
window.initMap = initMap;

export {};


