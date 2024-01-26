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
}

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

// legend example from https://github.com/googlemaps/js-samples/tree/main/samples/legend
const iconBase = "https://maps.google.com/mapfiles/kml/shapes/"
const icons = {
  parking: {
    name: "Parking",
    icon: iconBase + "parking_lot_maps.png"
  },
  library: {
    name: "Library",
    icon: iconBase + "library_maps.png"
  },
  info: {
    name: "Info",
    icon: iconBase + "info-i_maps.png"
  }
}

const features = [
  {
    position: new google.maps.LatLng(-33.91721, 151.2263),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91539, 151.2282),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91747, 151.22912),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.9191, 151.22907),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91725, 151.23011),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91872, 151.23089),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91784, 151.23094),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91682, 151.23149),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.9179, 151.23463),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91666, 151.23468),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.916988, 151.23364),
    type: "info"
  },
  {
    position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
    type: "parking"
  },
  {
    position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
    type: "parking"
  },
  {
    position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
    type: "parking"
  },
  {
    position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
    type: "parking"
  },
  {
    position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
    type: "parking"
  },
  {
    position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
    type: "parking"
  },
  {
    position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
    type: "parking"
  },
  {
    position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
    type: "library"
  }
]

features.forEach(feature => {
  new google.maps.Marker({
    position: feature.position,
    icon: icons[feature.type].icon,
    map: map
  })
})

const legend = document.getElementById("legend")

for (const key in icons) {
  const type = icons[key]
  const name = type.name
  const icon = type.icon
  const div = document.createElement("div")

  div.innerHTML = '<img src="' + icon + '"> ' + name
  legend.appendChild(div)
}

map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend)



window.initMap = initMap
window.eqfeed_callback = eqfeed_callback
export {}


