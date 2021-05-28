import Grid from '@material-ui/core/Grid';
import Balance from './Balance';
import CurrentData from './CurrentData';
import EthChartV2 from './EthChartV2';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    contentItems: {
        // marginBottom: theme.spacing(3),
        width: "100%"
    },
    contentContainer: {
        [theme.breakpoints.down('sm')]: {
            width: "100%"
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
                <Grid item className={classes.contentItems} xs={12} md={5}>
                    <Balance balance={data.Balance} />
                </Grid>

                <Grid item className={classes.contentItems} xs={12} md={7}>
                    <CurrentData stats={data['Daily'].stats} />
                </Grid>

                <Grid item className={classes.contentItems} xs={12} >
                    <EthChartV2 data={data} />
                </Grid >
            </Grid >
        </Grid >
    );
};

export default StatContent;