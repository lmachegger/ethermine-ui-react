import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paperContainer: {
        backgroundColor: "rgb(34, 43, 54)"
    },
    chart: {
        margin: theme.spacing(1)
    }
}));

const data = [
    { argument: 1, value: 10 },
    { argument: 2, value: 20 },
    { argument: 3, value: 30 },
];

const TestChart = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paperContainer} elevation={3}>
            <Chart
                data={data}
                className={classes.chart}
            >
                <ArgumentAxis />
                <ValueAxis />

                <LineSeries valueField="value" argumentField="argument" />
            </Chart>
        </Paper>
    );
};

export default TestChart;