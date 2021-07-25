import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons';


export default function Player({currentSong,setCurrentSong,isPlaying,setIsPlaying,audioRef,songInfo,setSongInfo,songs,setSongs}) {
    
    useEffect(()=>{
        const newSongs=songs.map((state)=>{
            if(state.id===currentSong.id){
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
    },[currentSong]);

    const playSongHandler=()=>{
        if(isPlaying){
        audioRef.current.pause();
        setIsPlaying(!isPlaying);
        }else{
        audioRef.current.play();
        setIsPlaying(!isPlaying);
        }
    }
    
    const skipHandler=async(direction)=>{
        let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
        if(direction==='forward'){
            await setCurrentSong(songs[(currentIndex+1)%songs.length]);
        }else{
            if((currentIndex-1)%songs.length === -1){
                await setCurrentSong(songs[songs.length-1]);
                if(isPlaying)audioRef.current.play();

                return;
            }
            await setCurrentSong(songs[(currentIndex-1)%songs.length]);
        }
        if(isPlaying)audioRef.current.play();
    }
    
    const getTime=(time)=>{
        return(
            Math.floor(time/60)+":"+("0"+ Math.floor(time%60)).slice(-2)
        )
    }
    
    const dragHandler=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    }
    return (
        <div className="player-container">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration||0} value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <p>{songInfo.duration?getTime(songInfo.duration):'0:00'}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon className="backward-skip"  onClick={()=>skipHandler('backward')} size="2x"  icon={faAngleLeft}/>
                <FontAwesomeIcon className="play" onClick={playSongHandler} size="2x"  icon={isPlaying?faPause:faPlay}/>
                <FontAwesomeIcon className="forward-skip"  onClick={()=>{skipHandler('forward')}} size="2x"  icon={faAngleRight}/>
            </div>
        </div>
    )
}
