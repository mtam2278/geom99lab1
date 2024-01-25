/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// [START maps_layer_data_quakes]
let map

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 20, lng: -160 },
    zoom: 2,
    styles: mapStyle
  })

  map.data.setStyle(styleFeature)

  // Get the earthquake data (JSONP format)
  // This feed is a copy from the USGS feed, you can find the originals here:
  //   http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
  const script = document.createElement("script")

  script.setAttribute(
    "src",
    "https://storage.googleapis.com/mapsdevsite/json/quakes.geo.json"
  )
  document.getElementsByTagName("head")[0].appendChild(script)
}

// Defines the callback function referenced in the jsonp file.
function eqfeed_callback(data) {
  map.data.addGeoJson(data)
}

function styleFeature(feature) {
  const low = [151, 83, 34] // color of mag 1.0
  const high = [5, 69, 54] // color of mag 6.0 and above
  const minMag = 1.0
  const maxMag = 6.0

  // fraction represents where the value sits between the min and max
  const fraction =
    (Math.min(feature.getProperty("mag"), maxMag) - minMag) / (maxMag - minMag)

  const color = interpolateHsl(low, high, fraction)

  return {
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      strokeWeight: 0.5,
      strokeColor: "#fff",
      fillColor: color,
      fillOpacity: 2 / feature.getProperty("mag"),
      // while an exponent would technically be correct, quadratic looks nicer
      scale: Math.pow(feature.getProperty("mag"), 2)
    },
    zIndex: Math.floor(feature.getProperty("mag"))
  }
}

function interpolateHsl(lowHsl, highHsl, fraction) {
  const color = []

  for (let i = 0; i < 3; i++) {
    // Calculate color based on the fraction.
    color.push((highHsl[i] - lowHsl[i]) * fraction + lowHsl[i])
  }

  return "hsl(" + color[0] + "," + color[1] + "%," + color[2] + "%)"
}

const mapStyle = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { color: "#fcfcfc" }]
  },
  {
    featureType: "water",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ visibility: "on" }, { hue: "#5f94ff" }, { lightness: 60 }]
  }
]

window.initMap = initMap
window.eqfeed_callback = eqfeed_callback
// [END maps_layer_data_quakes]
export {}



function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 63.333, lng: -150.5 },
    mapTypeId: "terrain",
  });
  const elevator = new google.maps.ElevationService();
  const infowindow = new google.maps.InfoWindow({});

  infowindow.open(map);
  // Add a listener for the click event. Display the elevation for the LatLng of
  // the click inside the infowindow.
  map.addListener("click", (event) => {
    displayLocationElevation(event.latLng, elevator, infowindow);
  });
}

function displayLocationElevation(location, elevator, infowindow) {
  // Initiate the location request
  elevator
    .getElevationForLocations({
      locations: [location],
    })
    .then(({ results }) => {
      infowindow.setPosition(location);
      // Retrieve the first result
      if (results[0]) {
        // Open the infowindow indicating the elevation at the clicked position.
        infowindow.setContent(
          "The elevation at this point <br>is " +
            results[0].elevation +
            " meters.",
        );
      } else {
        infowindow.setContent("No results found");
      }
    })
    .catch((e) =>
      infowindow.setContent("Elevation service failed due to: " + e),
    );
}

window.initMap = initMap;