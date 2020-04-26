import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import useMediaQuery from '@material-ui/core/useMediaQuery';


const Header = () => {
    const large = useMediaQuery('(min-width:1200px)');
    const medium = useMediaQuery('(min-width:600px');

    const imgStyle = {
        width: large ? 150 : medium ? 100 : 60,
        marginBottom: large ? 30 : 20,
        marginTop: 10
    }
    const titleStyle = {
        width: large ? 518 : medium ? 400 : 300,
    }
    return (
        <AppBar
            position="relative"
            color="transparent"
        >
            <Toolbar>
                <img src="/img/logo.png" style={imgStyle} alt="logo" />
                <img src="/img/title.png" style={titleStyle} alt="title" />
            </Toolbar>
        </AppBar>
    );
};

export default Header;
