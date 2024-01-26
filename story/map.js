let map

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat: -33.865427, lng: 151.196123 },
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
}

function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: "red",
    fillOpacity: 0.2,
    scale: Math.pow(2, magnitude) / 2,
    strokeColor: "white",
    strokeWeight: 0.5
  }
}

function eqfeed_callback(results) {
  map.data.addGeoJson(results)
}

window.initMap = initMap
window.eqfeed_callback = eqfeed_callback
export {}


// // Elevation template
// function displayLocationElevation(location, elevator, infowindow) {
//   // Initiate the location request
//   elevator
//     .getElevationForLocations({
//       locations: [location],
//     })
//     .then(({ results }) => {
//       infowindow.setPosition(location);
//       // Retrieve the first result
//       if (results[0]) {
//         // Open the infowindow indicating the elevation at the clicked position.
//         infowindow.setContent(
//           "The elevation at this point <br>is " +
//             results[0].elevation +
//             " meters.",
//         );
//       } else {
//         infowindow.setContent("No results found");
//       }
//     })
//     .catch((e) =>
//       infowindow.setContent("Elevation service failed due to: " + e),
//     );
// }


// const mapStyle = [
//   {
//     featureType: "all",
//     elementType: "all",
//     stylers: [{ visibility: "off" }]
//   },
//   {
//     featureType: "landscape",
//     elementType: "geometry",
//     stylers: [{ visibility: "on" }, { color: "#fcfcfc" }]
//   },
//   {
//     featureType: "water",
//     elementType: "labels",
//     stylers: [{ visibility: "off" }]
//   },
//   {
//     featureType: "water",
//     elementType: "geometry",
//     stylers: [{ visibility: "on" }, { hue: "#5f94ff" }, { lightness: 60 }]
//   }
// ]

// window.initMap = initMap
// window.eqfeed_callback = eqfeed_callback
// // [END maps_layer_data_quakes]
// export {}



