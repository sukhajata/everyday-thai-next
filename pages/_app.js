import App from 'next/app';
//import {Provider} from 'react-redux';
import React from 'react';
import { ScoreProvider } from '../context/ScoreContext';
import '../styles/global.css'

class MyApp extends App {
/*
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be accessed by the client
        return {pageProps: pageProps};
    }
*/
    render() {
        //pageProps that were returned  from 'getInitialProps' are stored in the props i.e. pageprops
        const {Component, pageProps} = this.props;

        return (
            <ScoreProvider>
                <Component {...pageProps}/>
            </ScoreProvider>
        );
    }
}

export default MyApp;