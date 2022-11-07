const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();

const PORT = 3001;

// parse the JSON data using express
app.use(express.json());
app.use(express.urlencoded({extended: false}));

let movies = [
    {
        id: '1', 
        title: 'Jurassic Park',
        director: 'Steven Spielberg',
    },
    {
        id: '2', 
        title: 'Inception',
        director: 'Christopher Nolan',
    }
];

// get the movie list as JSON
app.get("/movie", (req, res) => {
    res.json(movies)
});

// add a movie to the list
app.post("/movie", (req, res) => {
    const movie = req.body;

    console.log(movie);
    movies.push(movie);
    res.send('Movie is added to the list!');
});

// update a movie in the list
app.put("/movie/:id", (req, res) => {
    const found = movies.some(movie => movie.id === parseInt(req.params.id));
    
    if (found){
        const updateMovie = req.body;
        movies.forEach(movie => {
            if (movie.id === parseInt(req.params.id)) {
                user.title = updateMovie.title ? updateMovie.title: user.title;
                user.director = updateMovie.director ? updateMovie.director: user.director;
                res.json({msg: "Movie has been updated!", movie})
            }
        })
    }
});

// search for a movie in the list
app.get("/movie/:id", (req, res) => {
    const id = req.params.id;

    for (let movie of movies){
        if (movie.id === id){
            res.json(movie);
            return;
        }
    }
    res.status(404).send('Movie not found');
});

// remove a movie from the list
app.delete("/movie/:id", (req, res) => {
    const id = req.params.id;

    movies = movies.filter((movie) => {
        if (movie.id !== id){
            return true;
        }
        return false;
    });
    
    res.send('Movie is deleted');
});


// set the server to listen at port
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));