(function() {
    function SongPlayer() {
        /**
        * @desc SongPlayer object declared
        * @type {Object}
        */
        var SongPlayer = {};
        
        /**
        * @desc Log of currently playing song
        * @type {Object}
        */
        var currentSong = null;
     
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioURL, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };
        
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
        * @function play
        * @desc Plays current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                
                setSong(song);
                playSong(song);
            }
            else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function pause
        * @desc Pauses current song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();