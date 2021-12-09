var axios = require('axios');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 8000;
const layouts = require('express-ejs-layouts');

app.use(methodOverride('_method'));
app.set('view engine', 'ejs'); 
app.use(layouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

function makeGetRequest(path) {
    axios.get(path)
    .then(function(response) {
            console.log(response.data);
        })
        .catch(function(err){
            console.log("ERROR!", err);
        })
    };

//makeGetRequest('https://api.jikan.moe/v3/anime/1/videos');
makeGetRequest('https://api.jikan.moe/v3/anime/1/videos')


// axios.get('https://manga-scrapper-for-asura-scans-website.p.rapidapi.com/series')
// .then(function(response) {
//     console.log(response.data);
// })
// .catch(function(err) {
//     console.log(err);
// });

// 

// 