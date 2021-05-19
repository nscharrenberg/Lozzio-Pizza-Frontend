import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import { Route } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
    paper: {
        padding: theme.spacing(1, 2),
    },
}));

const SimpleBreadCrumbs = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={0} className={classes.paper}>
                <Route>
                    {({location}) => {
                        const pathnames = location.pathname.split('/').filter(x => x);

                        return (
                            <Breadcrumbs aria-label="Breadcrumb">
                                <RouterLink className={classes.link} color="inherit" to="/">
                                    <HomeIcon className={classes.icon} />
                                    Home
                                </RouterLink>
                                {pathnames.map((value, index) => {
                                    const last = index === pathnames.length-1;
                                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                                    if (index % 2) {
                                        return last ? (
                                            <Typography color="textPrimary" key={to}>
                                                {value}
                                            </Typography>
                                        ) : (
                                            <RouterLink color="inherit" key={to}>
                                                {value}
                                            </RouterLink>
                                        );
                                    } else {
                                        return;
                                    }
                                })}
                            </Breadcrumbs>
                        );
                    }}
                </Route>
            </Paper>
        </div>
    )
};

export default SimpleBreadCrumbs;
