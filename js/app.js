$(document).ready(function () {
  console.log('hello')
  $.getJSON('ip.json', function (data) {
    $.each(data.coordinates, function (key, val) {
      console.log(val.coordinates)
    })
  })
})
