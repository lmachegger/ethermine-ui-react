import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
    // Title,
    Legend
} from '@devexpress/dx-react-chart-material-ui';
import {
    ValueScale,
    // Animation,
} from '@devexpress/dx-react-chart';
import { makeStyles } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';

// style chart
const useStyles = makeStyles((theme) => ({
    paperContainer: {
        backgroundColor: "rgb(34, 43, 54)",
        height: "100%",
        borderRadius: "12px"
    },
    chart: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
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

// styled legend
const legendStyles = () => ({
    root: {
        display: "flex",
        margin: "auto",
        flexDirection: "row"
    }
});
const legendLabelStyles = (theme) => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: "nowrap"
    }
});
const legendItemStyles = () => ({
    item: {
        flexDirection: "column"
    }
});
const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
    legendLabelBase
);
const Item = withStyles(legendItemStyles, { name: "LegendItem" })(
    legendItemBase
);

// y-axis labels
const makeLabel = (symbol, color) => ({ text, style, ...restProps }) => (
    <ValueAxis.Label
        text={`${text} ${symbol}`}
        style={{
            fill: color,
            ...style
        }}
        {...restProps}
    />
);

const usdColor = "#42A5F5";
const UsdLabel = makeLabel("", usdColor);

const ethColor = "#FF7043";
const EthLabel = makeLabel("", ethColor);

// domain from 0 - max element
// const customDomain = (max) => [0, max]; // this works, but domains change for each filter then
const ethDomain = () => [0, 0.0003];
const usdDomain = () => [0, 1.2];

// render chart
const EthChart = ({ data }) => {
    const classes = useStyles();

    const [filter, setFilter] = React.useState('All');
    const [currentData, setCurrentData] = React.useState(getChartData(data[filter]));

    const handleClick = (buttonFilter) => {
        setFilter(buttonFilter);
    };

    React.useEffect(() => {
        setCurrentData(getChartData(data[filter]));
    }, [filter, data]);

    // const chartData = getChartData(data);
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

            <Chart
                data={currentData}
                className={classes.chart}
            >
                <Legend
                    position="bottom"
                    rootComponent={Root}
                    itemComponent={Item}
                    labelComponent={Label}
                />

                <ValueScale name="usdScale" modifyDomain={usdDomain} />
                <ValueAxis scaleName="usdScale" showGrid={false} position="right" labelComponent={UsdLabel} />

                <ValueScale name="ethScale" modifyDomain={ethDomain} />
                <ValueAxis scaleName="ethScale" showGrid={false} labelComponent={EthLabel} />

                <ArgumentAxis showLabels={false} />

                <LineSeries key="ETH" name="ETH per hour" valueField="coinsPerHour" argumentField="time" scaleName="ethScale" color={ethColor} />
                <LineSeries key="usd" name="USD per hour" valueField="usdPerHour" argumentField="time" scaleName="usdScale" color={usdColor} />
                {/* <Animation />  Animation is only working on first render, this is a missing feature of this chart lib*/}
            </Chart>
        </Paper>
    );
};

// map data to chartData
const getChartData = (data) => {
    if (!data?.stats?.length > 0) {
        return [];
    }

    const result = data.stats.map(stat => {
        return {
            time: stat.time,
            usdPerHour: stat.usdPerHour,
            coinsPerHour: stat.coinsPerHour
        };
    });
    return result;
};

export default EthChart;