require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const {Anime, Genre, Manga, Producer, Episodes, Trailors} = require ('./models');
const router = require('./controllers/auth');
const { object } = require('webidl-conversions');
let animeArray = [];

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(session({
  secret: SECRET_SESSION,    
  resave: false,             
  saveUninitialized: true    
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  
  axios.get('https://api.jikan.moe/v3/top/anime')
    .then(function(response) {
      console.log('RESPONSING FOR EPISODES RIGHT HERE', response.data.top);
    
    Genre.findAll()
    .then(function(genreList) {
      
      Producer.findAll()
      .then(function(produerList) {
        res.render('home/index', { animeVideos: response.data.top, genres: genreList, producers: produerList });
      })
    })
  })
})

app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});


app.use('/auth', require('./controllers/auth'));

app.get('/anime/show', function(req, res){
  axios.get('https://api.jikan.moe/v3/top/anime')
  .then(function(response) {
   
          res.render('animes/index', {animeTop: response.data.top});
      })
      .catch(function(err){
          console.log("ERROR!", err);
      })
})
app.get('/manga/show', function(req, res){
  axios.get('https://api.jikan.moe/v3/top/manga')
  .then(function(response){
    
    res.render('manga/index', {mangaTop: response.data.top});
  })
  .catch(function(err){
    console.log('ERROR', err);
  })
})

app.get('/writterPage', function( req, res){
  Producer.findAll()
  .then(function(response){
    res.render('home/index', { producer: response})
    console.log(response);
  })
  .catch(function(error){
    console.log('ERROR!', error);
  })
})

app.get('/anime/:id', function(req,res){
  
  let id = Number(req.params.id);
  let animeLink = ('https://api.jikan.moe/v3/anime/'+id+'/videos')
  axios.get(animeLink)
  .then(function(response) {
       
       axios.get('https://api.jikan.moe/v3/anime/'+id+'/')
       .then(function(resTwo){
         
        res.render('animePage/index', {fullmetal: response.data.episodes, fullmetalInfo: resTwo.data})
       })
      })
      .catch(function(err){
          console.log("ERROR!", err);

    })
  })

  app.get('/manga/:id', function(req,res){
  
    let id = Number(req.params.id);
    let mangaLink = ('https://api.jikan.moe/v3/manga/'+id+'/characters')
    axios.get(mangaLink)
    .then(function(response) {
          console.log(response.data);
         
         axios.get('https://api.jikan.moe/v3/manga/'+id+'/')
         .then(function(resTwo){
           
          res.render('mangaPage/index', {fullManga: response.data.characters, fullMangaInfo: resTwo.data})
         })
        })
        .catch(function(err){
            console.log("ERROR!", err);
  
      })
    })
    app.get('/mangaCharacters/:id', function(req,res){
  
      let id = Number(req.params.id);
      let mangaLink = ('https://api.jikan.moe/v3/manga/'+id+'/characters')
      axios.get(mangaLink)
      .then(function(response) {
            console.log(response.data);
            res.render('mangaPage/index', {fullManga: response.data.characters})
          })
          .catch(function(err){
              console.log("ERROR!", err);
    
        })
      })
    


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;

function makeGetRequest(path) {
  axios.get(path)
  .then(function(response) {
          console.log(response.data);
      })
      .catch(function(err){
          console.log("ERROR!", err);
      })
  };

  






