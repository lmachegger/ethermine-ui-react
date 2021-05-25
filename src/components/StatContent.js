import StatList from './StatList';
import Grid from '@material-ui/core/Grid';
import Balance from './Balance';
import CurrentData from './CurrentData';
import TestChart from './TestChart';
import EthChart from './EthChart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    contentItems: {
        // marginBottom: theme.spacing(3),
        width: "100%"
    },
    contentContainer: {
        [theme.breakpoints.down('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "90%"
        },
        [theme.breakpoints.up('md')]: {
            width: "80%"
        },
        [theme.breakpoints.up('lg')]: {
            width: "70%"
        },
        [theme.breakpoints.up('xl')]: {
            width: "50%"
        },
    }
}));

const StatContent = ({ data }) => {
    const classes = useStyles();
    return (
        <Grid container spacing={0} justify="center" alignItems="center">
            <Grid container className={classes.contentContainer} spacing={3} justify="center" alignItems="stretch">
                <Grid item className={classes.contentItems} xs={11} md={5}>
                    <Balance balance={data.Balance} />
                </Grid>

                <Grid item className={classes.contentItems} xs={11} md={6}>
                    <CurrentData stats={data['Daily'].stats} />
                </Grid>

                <Grid item className={classes.contentItems} xs={11} >
                    <EthChart data={data['All']} title="coinsPerHour" />
                </Grid >

                {/* <Grid item className={classes.contentItems} xs={11} md={8} lg={5}>
                <TestChart />
            </Grid >

            <Grid item className={classes.contentItems} xs={11} md={8} lg={5}>
                <StatList data={data} filter='avgStats' title='Averages' />
            </Grid>

            <Grid item className={classes.contentItems} xs={11} md={8} lg={5}>
                <StatList data={data} filter='maxStats' title='Maximums' />
            </Grid> */}
            </Grid >
        </Grid >
    );
};

export default StatContent;