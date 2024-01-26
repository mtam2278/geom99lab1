let map

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: { lat: 20.334999193082865, lng: -156.12237402661734 },
    mapTypeId: "terrain"
  })

  // Create a <script> tag and set the USGS URL as the source.
  const script = document.createElement("script")

  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  script.src =
    "https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js"
  document.getElementsByTagName("head")[0].appendChild(script)

  map.data.setStyle(feature => {
    const magnitude = feature.getProperty("mag")
    return {
      icon: getCircle(magnitude)
    }
  })
  function getCircle(magnitude) {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: "blue",
      fillOpacity: 0.5,
      scale: Math.pow(2, magnitude) / 2,
      strokeColor: "purple",
      strokeWeight: 1
    }
  }
  
  function eqfeed_callback(results) {
    map.data.addGeoJson(results)
  }
  
   // Define the LatLng coordinates for the polygon's path.
   const triangleCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
  ]
  
  // Construct the polygon.
  const bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35
  })
  
  bermudaTriangle.setMap(map)
}




window.initMap = initMap
window.eqfeed_callback = eqfeed_callback
export {}


