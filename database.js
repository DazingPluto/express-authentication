const { Producer, Manga, User, Genre, Company, Anime } = require('./models');

// Producer.bulkCreate([
//     {
//         name: 'Unfotable',
//         staff: 'TMS Entertainment',
//         awards: 'winning',
//         awards: 0,
//     },
//     {
//         name: 'WIT Studio',
//         staff: 'George Wada',
//         awards: 'winning',
//         awards: 0,
//     },
//     {
//         name: 'MAPPA',
//         staff: 'Masao Maruyama',
//         awards: 'winning',
//         awards: 0
//     },
//     {
//         name: 'A-1 pictures',
//         staff: 'Mikihiro Iwata',
//         awards: 'winning',
//         awards: 0,
//     },
//     {
//         name: 'Studio Ghibli',
//         staff: 'Hayao Miyazaki',
//         awards: 'Award Winning Animation',
//         awards: 13
//     },
//     {
//         name: 'TOEI ANIMATION',
//         staff: 'Toei Company',
//         awards: 'Award Winning Art',
//         awards: 3,
//     }
// ])
// .then(function(result) {
//     console.log('........ after creating all the producers .........');
//     console.log(result);
// })
// .catch(function(error) {
//     console.log('.... there is an error adding all of the producer, check below .....');
//     console.log(error);
// });

Anime.create({
    title: 'Naruto',
    date: 2011,
    genre: 'Fantosy, Action, YOUTH',
    company: 'A-1 pictures',
    cast: 'Naruto,....',
    lead: 'Naruto,....'
})
.then(function(anime){
    console.log('NEW ANIME');
    console.log(anime.toJSON());
})
.catch(function(err){
    console.log('ERROR');
    console.log(err);
})