const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const cors = require('cors');
const { validateSong } = require('./middleware/songs-validation');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/api/songs', (req, res) => {
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
});

app.get('/api/songs/:id', (req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send(song);
});

app.post('/api/songs', [validateSong], (req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong);
    return res.send(addedSong);
});

app.put('/api/products/:id', [validateSong], (req, res) => {
    const id = req.params.id;
    const songPropertiesToUpdate = req.body;
    const updatedSong = repoContext.songs.updateSong(id, songPropertiesToUpdate);
    return res.send(updatedSong)
});

app.delete('/api/songs/:id', (req, res) => {
    const id = req.params.id;
    const updatedDataSet = repoContext.songs.deleteSong(id);
    return res.send(updatedDataSet);
});
app.listen(5000, function () {
    console.log("Sever started. Listening on port 5000.");
});