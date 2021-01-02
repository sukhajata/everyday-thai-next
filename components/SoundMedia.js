import React, { useState } from 'react';
import Sound from 'react-sound';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import settings from '../config/settings';
import styles from '../styles';
import { textToSpeechThai } from '../services/dbAccess';

const SoundMedia = ({ textToSpeak, audioFileName }) => {
    const [playingStatus, setPlayingStatus] = useState(Sound.status.STOPPED);
    const audioUrl = settings.audioUrl;

    const getAudioUrl = fileName => {
        const path =  audioUrl + fileName + '.mp3';
        return path;
    }

    const playSound = () => {
        //if audiofile exists, will start playing. Also changes color of button
        setPlayingStatus(Sound.status.PLAYING);
        
        if (!audioFileName) {
            textToSpeechThai(textToSpeak);
            //change button color after delay
            setTimeout(() => setPlayingStatus(Sound.status.STOPPED), 1000);
        }
    }

    const onFinishedSpeaking = () => {
       setPlayingStatus(Sound.status.STOPPED);
    }

    return (
        <>
        {textToSpeak &&
            <>
                <PlayArrowIcon 
                    onClick={playSound}
                    fontSize="small" 
                    style={playingStatus === Sound.status.PLAYING ? styles.playingIcon : styles.playIcon }
                />
                {audioFileName &&
                    <Sound 
                        autoLoad={true}
                        url={getAudioUrl(audioFileName)}
                        playStatus={playingStatus}
                        onFinishedPlaying={onFinishedSpeaking}
                    />
                }
            </>
        }
        </>
    )
}

export default SoundMedia;