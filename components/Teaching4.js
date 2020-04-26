import React, { useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import styles from '../styles';
import settings from '../config/settings';

import { getLanguage } from '../services/dbAccess';
import SoundMedia from './SoundMedia';
import ButtonContine from './ButtonContinue';

const Teaching4 = ({ slide, imageUrl, moveNextSlide }) => { 
    const [cards, setCards] = useState([]);
    //const language = getLanguage();
    const english = settings.firstLanguage === "en";
//        const audioUrl = "https://sukhajata.com/audio/thai/female/";

    useEffect(() => {
        let newCards = [];
        slide.medias.forEach(media => {
            newCards.push({
                ...media,
                playing: false,
            })
        });
        setCards(newCards);
    }, [slide]);

    return (
        <React.Fragment>
            <Typography variant="body1" style={styles.info}>
                {english ? slide.english : slide.thai}
            </Typography>
            {cards && cards.map(media => (
                <Card key={media.id}
                    style={styles.defaultCard}
                >
                    <CardContent>
                        <Grid 
                            container 
                            direction="column"
                            justify="flex-start"
                        >
                            <Grid item>
                                <Typography variant="body1">
                                    {english ? media.thai : media.english}
                                </Typography>
                                {settings.firstLanguage === 'en' &&
                                <Typography variant="body1">
                                    {media.phonetic}
                                </Typography>
                                }
                                <Typography variant="body1" color="primary">
                                    {english ? media.english : media.thai}
                                </Typography>
                                {media.literalTranslation && 
                                    <Typography variant="body1" color="textSecondary">
                                        ({media.literalTranslation})
                                    </Typography>
                                }
                                {media.notes  && 
                                    <Typography style={styles.notes}>
                                        {media.notes}
                                    </Typography>
                                }
                                <SoundMedia textToSpeak={media.thai} audioFileName={media.audioFileName}/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            ))}
            <ButtonContine onClick={() => moveNextSlide(1)} />
        </React.Fragment>
    )
    
}

export default Teaching4;

/*
 <PlayArrowIcon 
                                        onClick={() => this.playSound(media)}
                                        fontSize="small" 
                                        className={media.className}
                                    />
                                    {media.audioFileName &&
                                        <Sound 
                                            autoLoad={true}
                                            url={this.getAudioUrl(media.audioFileName)}
                                            playStatus={media.playingStatus || Sound.status.STOPPED}
                                            onFinishedPlaying={() => this.onFinishedSpeaking(media)}
                                        />
                                    }
                                    */