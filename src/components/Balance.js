import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import theme from '../Theme';

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
    divider: {
        background: theme.palette.text.secondary
    }
}));

function Balance({ balance }) {
    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer} elevation={3}>
            <Typography className={classes.balanceHeader} variant="h5" gutterBottom>
                Balance
            </Typography>
            <Grid container justify="center">
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left">
                        Paid out
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary">
                        {balance.paid.toFixed(6)} ETH
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left" >
                        Pending
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary">
                        {balance.unpaid.toFixed(6)} ETH
                    </Typography>
                </Grid>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
            <Grid container justify="center" style={{ marginTop: theme.spacing(1) }}>
                <Grid container className={classes.textContainer} justify="space-between">
                    <Typography className={classes.balanceText} variant="body1" align="left" >
                        Total
                    </Typography>
                    <Typography className={classes.balanceText} variant="body1" align="right" color="textSecondary" gutterBottom >
                        {balance.total.toFixed(6)} ETH
                    </Typography>
                </Grid>
            </Grid>
        </Paper >
    );
}

export default Balance;