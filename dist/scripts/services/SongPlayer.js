(function() {
    function SongPlayer(Fixtures) {
        /**
        * @desc SongPlayer object declared
        * @type {Object}
        */
        var SongPlayer = {};
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function playSong
        * @desc Plays currentBuzzObject's audioURL file & sets song.playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function playSong
        * @desc Stops the currentBuzzObject and sets playing property to null
        * @param
        */
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }
            
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };
        
        /**
        * @function getSongIndex
        * @desc Gets index of current song from currentAlbum
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        };
        
        /**
        * @desc Current Album as retreived with Fixtures service's .getAlbum() method
        * @type {Object} PUBLIC
        */
        SongPlayer.currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc Log of currently playing song
        * @type {Object} PUBLIC
        */
        SongPlayer.currentSong = null;
        
        /**
        * @function play
        * @desc Plays current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                
                setSong(song);
                playSong(song);
            }
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function pause
        * @desc Pauses current song from currentAlbum
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous
        * @desc Plays the previous song
        * @param
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next
        * @desc Plays the next song from currentAlbum
        * @param
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > SongPlayer.currentAlbum.songs.length) {
                stopSong();
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();