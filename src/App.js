import React, { useEffect, useState } from "react";
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useStateValue } from "./StateProvider"

const spotify = new SpotifyWebApi();

function App() {
  // set the state of token so you can authenticate with spotify
  const [{ user, token }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    // remove the hash from the url and set it to be blank
    window.location.hash = ""; 
    const _token = hash.access_token;

    if (_token) {
       // set token to allow communication between react and spotify API
       spotify.setAccessToken(_token);

        dispatch({
          type: "SET_TOKEN",
          token: _token,
      });

        // send spotify a get request and grabs the user that is authenticated
        // execute the action 'SET_USER' and dispatch 'user' into data layer
        spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

        spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

         spotify.getPlaylist("").then((response) => {
           dispatch({
             type: 'SET_DISCOVER_WEEKLY',
             discover_weekly: response,
           });
         });
    }
    // console.log("I HAVE A TOKEN >>>>>>", token);
}, []);

    // console.log("I AM A USER >>>>>", user);
    // console.log("MY TOKEN IS >>>>>", token);

  return (
    <div className="app">
      {
        token ? <Player spotify={spotify}/> : <Login />  
      }

     
    </div>
  );
}

export default App;
