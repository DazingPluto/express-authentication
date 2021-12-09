require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const {Anime, Genre, Manga, Producer}

const SECRET_SESSION = process.env.SECRET_SESSION;
console.log(SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

Producer.create({
  name:'Kyoto Animation',
  staff: 'Hideaki Hatta',
  awards: '2020 WIA Diversity Award for Corporate Achievement',
  awards: 1
  })
  .then(function(newProducer){
      console.log('NEW PRODUCER ADDED');
      console.log(newProducer.toJSON());
  })
  .catch(function(error){
      console.log('Error creating player', error);
  });
  

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index');
})

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get(); 
  res.render('profile', { id, name, email });
});

// controllers
app.use('/auth', require('./controllers/auth'));

app.get('/animes', function(req, res){
  axios.get('https://api.jikan.moe/v3/anime/1/videos')
    .then(function(response) {
          console.log(response.data.promo);
          res.render('animes/index', {animes: response.data.promo});
      })
      .catch(function(err){
          console.log("ERROR!", err);
      })
})

app.get('/home', function(req, res){
  
})

app.get('/companyPage', function(req, res){

})

app.get('/writterPage', function( req, res){
  
})


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;

// function makeGetRequest(path) {
//   axios.get(path)
//   .then(function(response) {
//           console.log(response.data);
//       })
//       .catch(function(err){
//           console.log("ERROR!", err);
//       })
//   };

// //makeGetRequest('https://api.jikan.moe/v3/anime/1/videos');
// makeGetRequest('https://api.jikan.moe/v3/anime/1/videos')
