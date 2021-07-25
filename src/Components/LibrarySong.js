import React from 'react';


export default function LibrarySong({song,setCurrentSong,audioRef,isPlaying,songs,setSongs,id}) {
    const songSelectHandler=async(e)=>{
        await setCurrentSong(song);
        const newSongs=songs.map((state)=>{
            if(state.id===id){
                return{
                    ...state,
                    active:true
                };
            }else{
                return{
                    ...state,
                    active:false
                };
            }
        });
        setSongs(newSongs);
        if(isPlaying)audioRef.current.play();
        
    }

    return (
        <div onClick={songSelectHandler} className={`librarysong-container ${song.active?'selected':''}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
               <h3>{song.name}</h3>
               <h4>{song.artist}</h4>
            </div>
            
        </div>
    )
}
