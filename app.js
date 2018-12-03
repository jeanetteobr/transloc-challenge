import request from 'superagent'

let myMap = L.map('mapid').setView([35.9940, -78.8986], 3)

let baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamVhbmV0dGVvYnIiLCJhIjoiY2pva2hwMDgyMGcydzNybW81djUyd3gxMiJ9.Yjd3JwPb5Y_Q4yMh_HOOzg', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'your.mapbox.access.token'
}).addTo(myMap)

let heat = L.heatLayer([], {
  radius: 20,
  blur: 50,
  maxZoom: 1
}).addTo(myMap)

const mapBounds = myMap.getBounds()
request.get('https://kiwi-book.glitch.me/data')
  .query({
      lat1: mapBounds.getSouth(),
      lat2: mapBounds.getNorth(),
      lng1: mapBounds.getWest(),
      lng2: mapBounds.getEast()
    })
  .then(function (res) {
    return res.body
  })
  .then(function (body) {
    heat.setLatLngs(body.datapoints.map(val => [val[0], val[1], (val[2] / 100)]))
  })