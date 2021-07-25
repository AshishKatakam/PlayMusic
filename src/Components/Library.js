import React from 'react'
import LibrarySong from './LibrarySong';


export default function Library({songs,setCurrentSong,audioRef,isPlaying,setSongs,libraryStatus}) {
    return (
        <div className={`library-container ${libraryStatus? 'activate-library':''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map((song)=>(
                    <LibrarySong setCurrentSong={setCurrentSong}
                    song={song}
                    key={song.id}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    songs={songs}
                    setSongs={setSongs}
                    id={song.id}
                    />
                ))}
            </div>
        </div>
    )
}
