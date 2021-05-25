import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paperContainer: {
        backgroundColor: "rgb(34, 43, 54)",
        height: "100%",
        borderRadius: "12px"
    },
    balanceText: {
        paddingBottom: theme.spacing(1)
    },
    balanceHeader: {
        padding: theme.spacing(1)
    },
    textContainer: {
        width: "80%"
    },

}));

function CurrentData({ stats }) {
    const classes = useStyles();

    let currentStat;
    if (stats.length <= 0) {
        currentStat = {
            averageHashrate: 0,
            currentHashrate: 0,
            coinsPerHour: 0,
            usdPerHour: 0
        };
    }
    else {
        currentStat = stats[stats.length - 1];
    }

    return (
        <Paper className={classes.paperContainer} elevation={6}>
            <Typography className={classes.balanceHeader} variant="h5" gutterBottom>
                Current Data
            </Typography>
            <Grid container justify="center">
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left">
                        Avg Hashrate (24h)
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary">
                        {currentStat.averageHashrate.toFixed(4)} MH/s
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left">
                        Current Hashrate
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary">
                        {currentStat.currentHashrate.toFixed(4)} MH/s
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left">
                        ETH per hour
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary">
                        {currentStat.coinsPerHour.toFixed(6)} ETH/h
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left">
                        USD per hour
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary">
                        {currentStat.usdPerHour.toFixed(6)} USD/h
                    </Typography>
                </Grid>
            </Grid>
            {/* <Grid container justify="center">
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left" >
                        USD per 24h:
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary">
                        {balance.unpaid.toFixed(6)} USD
                    </Typography>
                </Grid>
            </Grid> */}
        </Paper >
    );
}

export default CurrentData;