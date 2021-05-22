import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import {ApiActions, OrderActions, PizzaActions} from "../../store";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SearchIcon from '@material-ui/icons/Search';
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    search: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
        marginTop: theme.spacing(2)
    },
}));

const ChangeApi = ({ baseUrl, changeUrl, reset }) => {
    const classes = useStyles();
    const [url, setUrl] = useState(baseUrl);

    useEffect(() => {
        setUrl(baseUrl);
    }, [baseUrl]);

    return (
        <Container className={classes.root}>
            <Typography variant={"h5"}>
                Change the API the client uses.
            </Typography>
            <Paper component="form" className={classes.search}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Order By ID"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <IconButton className={classes.iconButton} aria-label="search" onClick={() => changeUrl(url)}>
                    <SearchIcon />
                </IconButton>
                <IconButton className={classes.iconButton} aria-label="reset" onClick={() => {
                    reset()
                }}>
                    <ClearIcon />
                </IconButton>
            </Paper>
        </Container>
    );
};

const mapStateToProps = ({ apis }) => ({
    baseUrl: apis.baseUrl,
});

const mapDispatchToProps = dispatch => {
    const { changeUrl, reset } = ApiActions;

    return {
        dispatch,
        changeUrl: (url) => dispatch(changeUrl(url)),
        reset: () => dispatch(reset()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeApi);
