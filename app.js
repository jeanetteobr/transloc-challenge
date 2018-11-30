var testData = {
  max: 8,
  data: $.getJSON('ip.json', function (data) {
    $(data.info).each(function (idx, val) {
      console.log(val)
      return val
    })
  })
}

console.log(testData)

var myMap = L.map('mapid').setView([35.9940, -78.8986], 15)

var tiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamVhbmV0dGVvYnIiLCJhIjoiY2pva2hwMDgyMGcydzNybW81djUyd3gxMiJ9.Yjd3JwPb5Y_Q4yMh_HOOzg', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 20,
  id: 'mapbox.streets',
  accessToken: 'your.mapbox.access.token'
}).addTo(myMap)

var heat = L.heatLayer(testData).addTo(myMap)


