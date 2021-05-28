import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

import { Line } from 'react-chartjs-2';

// style chart
const useStyles = makeStyles((theme) => ({
    paperContainer: {
        backgroundColor: "rgb(34, 43, 54)",
        height: "100%",
        borderRadius: "12px"
    },
    chart: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(4)
    },
    buttonGroup: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3)
    },
    activeButton: {
        color: theme.palette.text.primary,
    },
    inactiveButton: {
        color: theme.palette.text.secondary,
    },
    header: {
        padding: theme.spacing(1)
    }
}));

const options = {
    scales: {
        yAxes: [
            {
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
            },
            {
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    drawOnArea: false,
                },
            },
        ],
    },
    elements: {
        point: {
            radius: 1,
            hitRadius: 2,
        },
        line: {
            borderWidth: 2
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function (context) {
                    var label = context.dataset.label || '';

                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += context.parsed.y.toFixed(6);
                    }
                    return label;
                }
            }
        }
    }
};

// render chart
const EthChartV2 = ({ data }) => {
    const classes = useStyles();

    const [filter, setFilter] = React.useState('All');
    const [currentData, setCurrentData] = React.useState(getChartData(data[filter]));

    const handleClick = (buttonFilter) => {
        setFilter(buttonFilter);
    };

    React.useEffect(() => {
        setCurrentData(getChartData(data[filter]));
    }, [filter, data]);

    return (
        <Paper className={classes.paperContainer} elevation={6}>
            <Typography className={classes.header} variant="h5">
                ETH/h vs USD/h
            </Typography>
            <ButtonGroup className={classes.buttonGroup} variant="text" aria-label="contained primary button group">
                <Button className={filter === 'Daily' ? classes.activeButton : classes.inactiveButton} onClick={() => handleClick('Daily')}>Daily</Button>
                <Button className={filter === 'Weekly' ? classes.activeButton : classes.inactiveButton} onClick={() => handleClick('Weekly')}>Weekly</Button>
                <Button className={filter === 'Monthly' ? classes.activeButton : classes.inactiveButton} onClick={() => handleClick('Monthly')}>Monthly</Button>
                <Button className={filter === 'All' ? classes.activeButton : classes.inactiveButton} onClick={() => handleClick('All')} >All</Button>
            </ButtonGroup>

            <Line className={classes.chart} data={currentData} options={options} />
        </Paper>
    );
};

// map data to chartData
const getChartData = (data) => {
    if (!data?.stats?.length > 0) {
        return [];
    }

    const chartJsResult = {
        labels: data.stats.map(stat => new Date(stat.time * 1000).toLocaleDateString()),
        datasets: [
            {
                label: 'eth/h',
                data: data.stats.map(stat => stat.coinsPerHour),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.5)',
                yAxisID: 'y-axis-1'
            },
            {
                label: 'usd/h',
                data: data.stats.map(stat => stat.usdPerHour),
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.5)',
                yAxisID: 'y-axis-2'
            }
        ]
    };
    return chartJsResult;
};

export default EthChartV2;