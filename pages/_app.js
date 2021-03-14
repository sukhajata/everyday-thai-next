//import {Provider} from 'react-redux';
import React from 'react';
import { ScoreProvider } from '../context/ScoreContext';
import '../styles/global.css'

const Application = ({ Component, pageProps }) => (
    <ScoreProvider>
        <Component {...pageProps}/>
    </ScoreProvider>
);

export default Application;