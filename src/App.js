
import React,{useState,useRef} from 'react';
import './styles/App.scss';

import Player from './Components/Player';
import Song from './Components/Song';
import Library from './Components/Library';
import Navbar from './Components/Navbar';


import data from './data';


function App() {

  const audioRef=useRef(null);

  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  const [songInfo,setSongInfo]=useState({
    currentTime:0,
    duration:0
  });
  const [libraryStatus,setLibraryStatus]=useState(false);


  const timeUpdateHandler=(e)=>{
  const currentTime=e.target.currentTime;
  const duration=e.target.duration;
  setSongInfo({...songInfo,currentTime,duration})
}
  
  const songEndHandler=async(e)=>{
    let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
    await setCurrentSong(songs[(currentIndex+1)%songs.length]);
    if(isPlaying)audioRef.current.play();
  }
  return (
    <div className={`App ${libraryStatus ? 'library-active':''}`}>
      <Navbar libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player 
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      audioRef={audioRef}
      songs={songs}
      setSongs={setSongs}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} setSongs={setSongs} isPlaying={isPlaying}
      libraryStatus={libraryStatus}/>
      <audio onTimeUpdate={timeUpdateHandler}
      onLoadedMetadata={timeUpdateHandler}
      ref={audioRef}
      src={currentSong.audio}
      onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
