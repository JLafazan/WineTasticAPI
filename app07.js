$(document).ready(function(){



// Default vars
var buttonTitles = [
  'red wine',
  'white wine',
  'california wineries',
  'wine tours',
  'wine fun'
];
// var $buttonContainer = $('.button_Container');

// API keys
var apiKey = "LJ6Q8jBMY3ldIHAgxxgUW6tjSaRhPqCr";
var queryURL = "https://api.giphy.com/v1/gifs/search";
var googleMapapiKey= "AIzaSyCyswQe8LuGs4TY79PITYkp4v3K8YD7yfk";


// Function definitions

function getQueryURLForTopic(topic) {
  return "https://api.giphy.com/v1/gifs/search?q=" +
         topic + "&api_key=" + apiKey + "&limit=2";


}

function createButton(text) {
  var btn = document.createElement("BUTTON");
  btn.style.margin = "0 10px";
  btn.style.background = "yellow";
  var t = document.createTextNode(text);
  btn.appendChild(t);
  document.querySelector(".buttons-appear-here").appendChild(btn);
}



// Create first buttons
for (var i = 0; i < buttonTitles.length; i++) {
  createButton(buttonTitles[i]);
};


// Event listenders

$(document).on("click", ".buttons-appear-here button", function() {

  $('#gifs-appear-here').empty();

  console.log(this)
  console.log("wineTopic = " + this.innerText);
  
  $.ajax({
    url: getQueryURLForTopic(this.innerText),
    method: "GET",
  })
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height.url);

        gifDiv.append(p);
        gifDiv.append(personImage);

        $("#gifs-appear-here").append(gifDiv);
      }
    });
});


//Creating new buttons

$('#add-new-entry-button').on("click", function() {

  // Get input text and put into a variable
  var text = document.querySelector("#new-entry-input").value;
  console.log("Text=", text);
  // add input text to buttonTitles
  buttonTitles.push(text);
  console.log("ButtonTitles=", buttonTitles);

  //create new button add new button to DOM
  createButton(text);


});


// // Create a Google Map

$(document).on("click", "#maps", function() {


//  38.58 and -121.505 UC Davis Extension


function initMap() {
        x = $("#lat").val();
        y = $("#lon").val();
        x = Number(x);
        y = Number(y);

        console.log(x);
        console.log(y);

        

        var uluru = {lat: x, lng: y};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: uluru
        
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
        initMap();
      });


});





