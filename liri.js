var env = require("dotenv").config()

var keys = require("./keys.js")

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require("fs");

var moment = require('moment');

moment().format();


var input = process.argv[2];


var band = function(artist) {
  var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  if (artist === undefined) {
    artist = "radiohead";
  }

  axios.get(queryUrl).then(
    
    function(response) {
      // console.log(response);
      for (i = 1; i < 6; i++) {
          console.log("Concert " + [i])
          console.log("Venue Name : " + response.data[i].venue.name)
          console.log("Venue Location : " + response.data[i].venue.city + ", " + response.data[i].venue.country);
          var date = response.data[i].datetime;
          console.log("Date : " + moment(date).format("dddd, MMMM Do YYYY"));
          console.log("\n ---------------- \n");
      }
    }
  )
}



var omdb = function(movieSearch) {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
  if (movieSearch === undefined) {
    movieSearch = "mr. nobody";
  }
 

axios.get(queryUrl).then(
  function(response) {
    // console.log(response);
    console.log(movieSearch);
    console.log("\n______________________________\n");
    console.log("Title : " + response.data.Title);
    console.log("Year : " + response.data.Year);
    console.log("IMDB Rating : " + response.data.Rated);
    console.log("RottenTomatoes Rating : " + response.data.Ratings[1].Value);
    console.log("Country : " + response.data.Country);
    console.log("Language : " + response.data.Language);
    console.log("Plot : " + response.data.Plot);
    console.log("Actors : " + response.data.Actors);
    console.log("\n -------------------- \n");
  }
);}

var songSearch = function(searchSong) {
  if (searchSong === undefined) {
    searchSong = "don't stop me now";
  }
  spotify.search (
    {
      type: "track",
      query: searchSong
    },
  ).then(function(response){
  console.log(response[0])
  console.log(response.tracks.items.length + " results found, displaying top 10");
  for (i = 0; i < 10; i++) {
    console.log("Result : " + i);
    console.log("Artist : " + response.tracks.items[i].album.artists[0].name);
    console.log("Song Name : " + response.tracks.items[i].album.name)
    console.log("Album Name : " + response.tracks.items[i].name);
    console.log("Preview : " + response.tracks.items[i].preview_url);
    console.log("\n-----------------------\n");
}
}).catch(function(err) {
console.log("Error : " + err);
})
  }

  var run = function(go) {
    if (input === "concert-this") {
      artist = process.argv[3];
      band(artist);
      fs.appendFile("random.txt", "\n" + input + artist + "\n", function(err) {
        if (err) throw err;
      });
    }
    if (input === "movie-this") {
      movieSearch = process.argv[3];
      omdb(movieSearch);
      fs.appendFile("random.txt", "\n" + input + movieSearch + "\n", function(err) {
        if (err) throw err;
      });
    }
    if (input === "spotify-this-song") {
      searchSong = process.argv[3];
      songSearch(searchSong);
      fs.appendFile("random.txt", "\n" + input + searchSong + "\n", function(err) {
        if (err) throw err;
      });
    }


  }
run();

  