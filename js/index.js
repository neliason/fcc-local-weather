var tempCelsius
var tempFarenheight

$("#tempUnitBtn").on("click", function() {
  var tempUnit = $("#tempUnitBtn").text()
  if (tempUnit === "°F") {
    setTempFarenheight()
  } else {
    setTempCelsius()
  }
})

function setTempFarenheight() {
  $("#tempUnitBtn").text("°C")
  $("#temperature").text(Math.floor(tempFarenheight) + "°F")
}

function setTempCelsius() {
  $("#tempUnitBtn").text("°F")
  $("#temperature").text(Math.floor(tempCelsius) + "°C")
}

$(document).ready(function() {

  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
      var latitude = position.coords.latitude
      var longitude = position.coords.longitude
      //latitude = 41.661129
      //longitude = -91.530167
      
      var api_url = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude
      $.ajax({
        url: api_url,
        dataType: "jsonp",
        success: function(data) {
          console.log(data)
          var location = data.name
          tempCelsius = data.main.temp
          tempFarenheight = tempCelsius * 9/5 + 32
          var iconURL = data.weather[0].icon
          var description = data.weather[0].description
          $("#location").html(location)
          $("#temperature").html(Math.floor(tempFarenheight) + "°F")
          $("#description").html(description)
          $("#weather-icon").attr("src",iconURL)
          $("#tempUnitBtn").attr("disabled", false)
        }, 
        cache: false
      });
    });
  }
  
  
});