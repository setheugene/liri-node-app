require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


var axios = require("axios");

var inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        message: "name a movie",
        name: "input",
    }
])
.then(function(response) {
var movieName = response.input;

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("Release Year: " + response.data.Year);
  }
)}
);